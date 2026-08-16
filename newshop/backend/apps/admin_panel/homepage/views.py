import json
import traceback

from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.db import models

from .models import HomepageSection, SectionManualProduct
from apps.admin_panel.products.models import Product


def get_default_sections():
    return [
        {'type': 'banners', 'title': 'بنرها'},
        {'type': 'categories', 'title': 'دسته‌بندی‌ها'},
        {'type': 'flash_sale', 'title': 'پیشنهاد شگفت‌انگیز'},
        {'type': 'brands', 'title': 'برندها'},
    ]


def ensure_default_sections():
    """ساخت بخش‌های پیش‌فرض اگر وجود ندارند"""
    max_order = HomepageSection.objects.aggregate(models.Max('order'))['order__max'] or 0
    
    for default in get_default_sections():
        if not HomepageSection.objects.filter(type=default['type']).exists():
            max_order += 1
            HomepageSection.objects.create(
                type=default['type'],
                title=default['title'],
                order=max_order,
                is_active=True
            )


@login_required
def homepage_sections_list(request):
    """صفحه مدیریت بخش‌ها"""
    ensure_default_sections()
    
    products_list = []
    try:
        all_products = Product.objects.select_related('category', 'brand').all()[:500]
        
        for p in all_products:
            product_data = {
                'id': p.id,
                'name': str(p.name),
                'sku': str(getattr(p, 'sku', '') or ''),
                'salePrice': 0,
                'category': '',
                'brand': '',
            }
            
            try:
                if hasattr(p, 'sale_price') and p.sale_price:
                    product_data['salePrice'] = float(p.sale_price)
                elif hasattr(p, 'original_price') and p.original_price:
                    product_data['salePrice'] = float(p.original_price)
            except:
                pass
            
            try:
                if hasattr(p, 'category') and p.category:
                    product_data['category'] = str(p.category.title)
            except:
                pass
            
            try:
                if hasattr(p, 'brand') and p.brand:
                    product_data['brand'] = str(p.brand.name)
            except:
                pass
            
            products_list.append(product_data)
        
        print(f"✅ Loaded {len(products_list)} products")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # ⚠️ مهم: لیست را مستقیم بفرست، json.dumps نزن!
    return render(request, 'admin_panel/homepage.html', {
        'products_json': products_list,
    })


@login_required
def api_sections_list(request):
    """لیست همه بخش‌ها"""
    ensure_default_sections()
    sections = HomepageSection.objects.prefetch_related('manual_products__product').all()
    return JsonResponse({
        'success': True,
        'sections': [s.to_dict() for s in sections]
    })


@login_required
@require_POST
def api_section_save(request):
    """ایجاد / ویرایش بخش"""
    try:
        section_id = request.POST.get('id')
        section = get_object_or_404(HomepageSection, id=section_id) if section_id else None
        
        title = request.POST.get('title', '').strip()
        section_type = request.POST.get('type', '').strip()
        is_active = request.POST.get('isActive') == 'true'
        auto_mode = request.POST.get('autoMode') == 'true'
        
        # بخش پیش‌فرض: فقط toggle
        if section and section.is_default:
            section.is_active = is_active
            section.save()
            return JsonResponse({
                'success': True,
                'section': section.to_dict(),
                'message': 'وضعیت بخش تغییر کرد'
            })
        
        if not title:
            return JsonResponse({'success': False, 'error': 'عنوان بخش الزامی است'}, status=400)
        
        if not section_type:
            return JsonResponse({'success': False, 'error': 'نوع بخش الزامی است'}, status=400)
        
        if section:
            section.title = title
            section.is_active = is_active
            section.auto_mode = auto_mode
            section.save()
        else:
            max_order = HomepageSection.objects.aggregate(models.Max('order'))['order__max'] or 0
            section = HomepageSection.objects.create(
                type=section_type,
                title=title,
                is_active=is_active,
                auto_mode=auto_mode,
                order=max_order + 1
            )
        
        # مدیریت محصولات دستی
        manual_products_json = request.POST.get('manualProducts', '[]')
        try:
            manual_products = json.loads(manual_products_json)
        except json.JSONDecodeError:
            manual_products = []
        
        section.manual_products.all().delete()
        
        for i, mp in enumerate(manual_products):
            product_id = mp.get('id')
            if product_id:
                try:
                    product = Product.objects.get(id=product_id)
                    SectionManualProduct.objects.create(
                        section=section,
                        product=product,
                        order=i
                    )
                except Product.DoesNotExist:
                    pass
        
        return JsonResponse({
            'success': True,
            'section': section.to_dict(),
            'message': 'بخش با موفقیت ذخیره شد'
        })
    
    except Exception as e:
        traceback.print_exc()
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


@login_required
@require_POST
def api_section_delete(request):
    """حذف بخش"""
    try:
        section_id = request.POST.get('id')
        section = get_object_or_404(HomepageSection, id=section_id)
        
        if section.is_default:
            return JsonResponse({
                'success': False,
                'error': 'بخش‌های پیش‌فرض قابل حذف نیستند'
            }, status=400)
        
        section.delete()
        
        sections = HomepageSection.objects.all().order_by('order')
        for i, s in enumerate(sections, 1):
            s.order = i
            s.save()
        
        return JsonResponse({'success': True, 'message': 'بخش حذف شد'})
    
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


@login_required
@require_POST
def api_sections_reorder(request):
    """تغییر ترتیب بخش‌ها"""
    try:
        orders_json = request.POST.get('orders', '[]')
        orders = json.loads(orders_json)
        
        for item in orders:
            section_id = item.get('id')
            order = item.get('order')
            if section_id and order is not None:
                HomepageSection.objects.filter(id=section_id).update(order=order)
        
        return JsonResponse({'success': True, 'message': 'ترتیب به‌روز شد'})
    
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


@login_required
@require_POST
def api_section_toggle(request):
    """تغییر وضعیت فعال/غیرفعال"""
    try:
        section_id = request.POST.get('id')
        section = get_object_or_404(HomepageSection, id=section_id)
        
        section.is_active = not section.is_active
        section.save()
        
        return JsonResponse({
            'success': True,
            'section': section.to_dict(),
            'message': f'بخش {"فعال" if section.is_active else "غیرفعال"} شد'
        })
    
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)