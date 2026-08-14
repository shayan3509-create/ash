import json
import base64
import uuid
import traceback

from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.core.files.base import ContentFile

from .models import Product, ProductImage, ProductSpec, ProductColor, ProductSize
from apps.admin_panel.categories.models import Category
from apps.admin_panel.brands.models import Brand


def decode_data_url(data_url):
    """تبدیل base64 data URL به فایل"""
    if not data_url or not data_url.startswith("data:"):
        return None
    try:
        header, data = data_url.split(",", 1)
        ext = header.split("/")[1].split(";")[0]
        if ext == "jpeg":
            ext = "jpg"
        return ContentFile(base64.b64decode(data), name=f"{uuid.uuid4().hex}.{ext}")
    except Exception as e:
        print(f"❌ Error decoding data URL: {e}")
        return None


@login_required
def products_list(request):
    """صفحه مدیریت محصولات"""
    categories = Category.objects.filter(is_active=True).order_by("order", "-created_at")
    brands = Brand.objects.filter(is_active=True).order_by("name")
    
    return render(request, "admin_panel/products.html", {
        "categories_list": [c.to_dict() for c in categories],
        "brands_list": [b.to_dict() for b in brands],
    })


@login_required
def api_products_list(request):
    """لیست همه محصولات (JSON)"""
    products = Product.objects.select_related("category", "brand").prefetch_related(
        "images", "specs", "colors", "sizes"
    ).all()
    return JsonResponse({
        "success": True,
        "products": [p.to_dict() for p in products],
    })


def safe_int(value, default=0):
    """تبدیل ایمن به int"""
    if not value and value != 0:
        return default
    try:
        return int(float(value))
    except (ValueError, TypeError):
        return default


def safe_float(value, default=0):
    """تبدیل ایمن به float"""
    if not value and value != 0:
        return default
    try:
        return float(value)
    except (ValueError, TypeError):
        return default


def safe_json(value, default=None):
    """پارس ایمن JSON"""
    if not value or value in ("", "[]", "{}", "null"):
        return default if default is not None else []
    try:
        return json.loads(value)
    except json.JSONDecodeError:
        return default if default is not None else []


@login_required
def api_product_save(request):
    """ایجاد / ویرایش محصول (نسخه کامل و ضدخطا)"""
    if request.method != "POST":
        return JsonResponse({"success": False, "error": "متد نامعتبر"}, status=405)

    try:
        product_id = request.POST.get("id")
        product = get_object_or_404(Product, id=product_id) if product_id else Product()
        is_new = not bool(product_id)

        # ---------- اعتبارسنجی اولیه ----------
        name = request.POST.get("name", "").strip()
        if not name:
            return JsonResponse({"success": False, "error": "نام محصول الزامی است"}, status=400)

        # ---------- اطلاعات اصلی ----------
        product.name = name
        product.name_en = request.POST.get("nameEn", "").strip()
        
        slug = request.POST.get("slug", "").strip()
        if slug:
            product.slug = slug

        # دسته‌بندی (اجباری)
        cat_id = request.POST.get("categoryId")
        if cat_id and str(cat_id).isdigit():
            if not Category.objects.filter(id=int(cat_id)).exists():
                return JsonResponse({"success": False, "error": "دسته‌بندی انتخاب‌شده معتبر نیست"}, status=400)
            product.category_id = int(cat_id)
        else:
            return JsonResponse({"success": False, "error": "انتخاب دسته‌بندی الزامی است"}, status=400)

        # برند (اختیاری)
        brand_id = request.POST.get("brandId")
        if brand_id and str(brand_id).isdigit():
            if Brand.objects.filter(id=int(brand_id)).exists():
                product.brand_id = int(brand_id)
            else:
                product.brand_id = None
        else:
            product.brand_id = None

        product.status = request.POST.get("status", "active")
        product.show_on_site = str(request.POST.get("showOnSite")).lower() == "true"

        # ---------- قیمت و موجودی ----------
        product.original_price = safe_int(request.POST.get("originalPrice"))
        product.sale_price = safe_int(request.POST.get("salePrice"))
        product.discount_percent = safe_int(request.POST.get("discount"))
        product.stock = safe_int(request.POST.get("stock"))
        product.sku = request.POST.get("sku", "").strip()

        # ---------- مشخصات فیزیکی ----------
        product.weight = safe_int(request.POST.get("weight"))
        product.length = safe_float(request.POST.get("dimL"))
        product.width = safe_float(request.POST.get("dimW"))
        product.height = safe_float(request.POST.get("dimH"))

        # ---------- توضیحات ----------
        product.short_description = request.POST.get("shortDescription", "")
        product.full_description = request.POST.get("fullDescription", "")

        # ---------- SEO ----------
        product.seo_title = request.POST.get("seoTitle", "")
        product.seo_description = request.POST.get("seoDescription", "")
        product.seo_keywords = request.POST.get("seoKeywords", "")

        # ذخیره اولیه محصول
        product.save()

        # ---------- تصاویر ----------
        images_data = safe_json(request.POST.get("images"), [])
        if isinstance(images_data, list):
            # شناسایی تصاویری که باید نگه داشته شوند
            keep_ids = []
            for img in images_data:
                if img.get("type") == "existing" and img.get("id"):
                    try:
                        keep_ids.append(int(img.get("id")))
                    except (ValueError, TypeError):
                        pass

            # حذف تصاویری که دیگر وجود ندارند
            for img_obj in list(product.images.all()):
                if img_obj.id not in keep_ids:
                    if img_obj.image:
                        img_obj.image.delete(save=False)
                    img_obj.delete()

            # افزودن یا به‌روزرسانی تصاویر
            for i, img in enumerate(images_data):
                if img.get("type") == "new":
                    # تصویر جدید - base64 را decode و ذخیره کن
                    data_url = img.get("dataUrl") or img.get("url")
                    if data_url:
                        file = decode_data_url(data_url)
                        if file:
                            ProductImage.objects.create(
                                product=product,
                                image=file,
                                is_main=bool(img.get("isMain", False)),
                                order=i
                            )
                else:
                    # تصویر موجود - فقط ترتیب و isMain را به‌روزرسانی کن
                    img_id = img.get("id")
                    if img_id:
                        try:
                            img_obj = product.images.filter(id=int(img_id)).first()
                            if img_obj:
                                img_obj.is_main = bool(img.get("isMain", False))
                                img_obj.order = i
                                img_obj.save()
                        except (ValueError, TypeError):
                            pass

        # ---------- ویدیو ----------
        video_data = request.POST.get("videoData", "")
        if video_data and video_data.startswith("data:"):
            if product.video:
                product.video.delete(save=False)
            file = decode_data_url(video_data)
            if file:
                product.video = file
                product.save(update_fields=["video"])

        if request.POST.get("videoRemove") == "true":
            if product.video:
                product.video.delete(save=False)
                product.video = None
                product.save(update_fields=["video"])

        # ---------- مشخصات فنی ----------
        specs_data = safe_json(request.POST.get("specs"), [])
        if isinstance(specs_data, list):
            product.specs.all().delete()
            for i, s in enumerate(specs_data):
                key = (s.get("key") or "").strip()
                value = (s.get("value") or "").strip()
                if key and value:
                    ProductSpec.objects.create(
                        product=product, key=key, value=value, order=i
                    )

        # ---------- رنگ‌ها ----------
        colors_data = safe_json(request.POST.get("colors"), [])
        if isinstance(colors_data, list):
            product.colors.all().delete()
            for c in colors_data:
                name = (c.get("name") or "").strip()
                hex_code = (c.get("hex") or "#000000").strip()
                if name:
                    ProductColor.objects.create(
                        product=product, name=name, hex_code=hex_code
                    )

        # ---------- سایزها ----------
        sizes_data = safe_json(request.POST.get("sizes"), [])
        if isinstance(sizes_data, list):
            product.sizes.all().delete()
            for s in sizes_data:
                size_value = str(s).strip() if not isinstance(s, dict) else str(s.get("size", "")).strip()
                if size_value:
                    ProductSize.objects.create(product=product, size=size_value)

        return JsonResponse({
            "success": True,
            "id": product.id,
            "message": "محصول جدید ایجاد شد" if is_new else "محصول با موفقیت ویرایش شد",
            "product": product.to_dict()
        })

    except Exception as e:
        # چاپ خطا در ترمینال برای debug
        print("=" * 60)
        print("❌ خطای ذخیره محصول:")
        traceback.print_exc()
        print("=" * 60)
        return JsonResponse({
            "success": False,
            "error": f"خطای سرور: {str(e)}"
        }, status=500)


@login_required
def api_product_delete(request):
    """حذف محصول"""
    if request.method != "POST":
        return JsonResponse({"success": False, "error": "متد نامعتبر"}, status=405)

    try:
        product_id = request.POST.get("id")
        if not product_id:
            return JsonResponse({"success": False, "error": "شناسه محصول الزامی است"}, status=400)
        
        product = get_object_or_404(Product, id=product_id)

        # حذف فایل‌های مرتبط
        for img_obj in product.images.all():
            if img_obj.image:
                img_obj.image.delete(save=False)
        if product.video:
            product.video.delete(save=False)

        product_name = product.name
        product.delete()
        return JsonResponse({"success": True, "message": f"محصول '{product_name}' حذف شد"})
    
    except Exception as e:
        traceback.print_exc()
        return JsonResponse({"success": False, "error": str(e)}, status=500)