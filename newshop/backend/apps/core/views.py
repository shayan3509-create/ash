from django.shortcuts import render
from apps.admin_panel.banners.models import Banner
from apps.admin_panel.categories.models import Category
from apps.admin_panel.brands.models import Brand
from apps.admin_panel.products.models import Product
from apps.admin_panel.homepage.models import HomepageSection


def home(request):
    """صفحه اصلی فروشگاه - با بخش‌های پویا"""
    
    # گرفتن بخش‌های فعال و مرتب‌شده
    active_sections = HomepageSection.objects.filter(
        is_active=True
    ).prefetch_related('manual_products__product').order_by('order')
    
    sections_data = []
    
    for section in active_sections:
        section_info = {
            'type': section.type,
            'title': section.title,
            'order': section.order,
        }
        
        # ========== بنرها (با is_active_now مثل قبل) ==========
        if section.type == 'banners':
            banners = [
                b.to_dict()
                for b in Banner.objects.order_by("order", "-created_at")
                if b.is_active_now()
            ]
            section_info['banners'] = banners
        
        # ========== دسته‌بندی‌ها ==========
        elif section.type == 'categories':
            # فیلد فعال را بر اساس مدل خودت تنظیم کن
            try:
                categories = Category.objects.filter(is_active=True).order_by('order', '-created_at')[:12]
            except:
                categories = Category.objects.all().order_by('order', '-created_at')[:12]
            section_info['categories'] = [c.to_dict() for c in categories]
        
        # ========== برندها ==========
        elif section.type == 'brands':
            try:
                brands = Brand.objects.filter(is_active=True).order_by('name')[:12]
            except:
                brands = Brand.objects.all().order_by('name')[:12]
            section_info['brands'] = brands
        
        # ========== پیشنهاد شگفت‌انگیز ==========
        elif section.type == 'flash_sale':
            products = Product.objects.filter(
                status='active',
                show_on_site=True,
                discount_percent__gt=0
            ).order_by('-discount_percent')[:8]
            section_info['products'] = products
        
        # ========== پرفروش‌ترین‌ها ==========
        elif section.type == 'bestsellers':
            products = Product.objects.filter(
                status='active',
                show_on_site=True
            ).order_by('-created_at')[:8]
            section_info['products'] = products
        
        # ========== جدیدترین‌ها ==========
        elif section.type == 'newest':
            products = Product.objects.filter(
                status='active',
                show_on_site=True
            ).order_by('-created_at')[:8]
            section_info['products'] = products
        
        # ========== بیشترین تخفیف ==========
        elif section.type == 'most_discounted':
            products = Product.objects.filter(
                status='active',
                show_on_site=True,
                discount_percent__gt=0
            ).order_by('-discount_percent')[:8]
            section_info['products'] = products
        
        # ========== کم‌فروش‌ترین‌ها ==========
        elif section.type == 'least_sellers':
            products = Product.objects.filter(
                status='active',
                show_on_site=True
            ).order_by('created_at')[:8]
            section_info['products'] = products
        
        # ========== محصولات تخفیف‌دار ==========
        elif section.type == 'discounted':
            products = Product.objects.filter(
                status='active',
                show_on_site=True,
                discount_percent__gt=0
            ).order_by('-discount_percent')[:8]
            section_info['products'] = products
        
        # ========== انتخاب دستی ==========
        elif section.type == 'manual':
            manual_products = []
            for mp in section.manual_products.all().order_by('order'):
                if mp.product:
                    manual_products.append(mp.product)
            section_info['products'] = manual_products
        
        sections_data.append(section_info)
    
    context = {
        'sections': sections_data,
    }
    
    return render(request, 'shop/home.html', context)