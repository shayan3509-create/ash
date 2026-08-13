import json
import base64
import uuid

from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.core.files.base import ContentFile

from .models import Product, ProductImage, ProductSpec, ProductColor, ProductSize, Brand
from apps.admin_panel.categories.models import Category


def decode_data_url(data_url):
    """تبدیل base64 data URL به فایل"""
    header, data = data_url.split(",", 1)
    ext = header.split("/")[1].split(";")[0]
    if ext == "jpeg":
        ext = "jpg"
    return ContentFile(base64.b64decode(data), name=f"{uuid.uuid4().hex}.{ext}")


@login_required
def products_list(request):
    """صفحه مدیریت محصولات"""
    categories = Category.objects.filter(is_active=True).order_by("order", "-created_at")
    brands = Brand.objects.filter(is_active=True).order_by("name")
    return render(request, "admin_panel/products.html", {
        "categories_json": json.dumps([c.to_dict() for c in categories], ensure_ascii=False),
        "brands_json": json.dumps([b.to_dict() for b in brands], ensure_ascii=False),
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


@login_required
def api_brands_list(request):
    """لیست برندها (JSON)"""
    brands = Brand.objects.filter(is_active=True).order_by("name")
    return JsonResponse({"success": True, "brands": [b.to_dict() for b in brands]})


@login_required
def api_product_save(request):
    """ایجاد / ویرایش محصول"""
    if request.method != "POST":
        return JsonResponse({"success": False, "error": "متد نامعتبر"}, status=405)

    product_id = request.POST.get("id")
    product = get_object_or_404(Product, id=product_id) if product_id else Product()

    name = request.POST.get("name", "").strip()
    if not name:
        return JsonResponse({"success": False, "error": "نام محصول الزامی است"}, status=400)

    # ---------- اطلاعات اصلی ----------
    product.name = name
    product.name_en = request.POST.get("nameEn", "").strip()

    slug = request.POST.get("slug", "").strip()
    if slug:
        product.slug = slug

    category_id = request.POST.get("categoryId")
    if category_id:
        product.category_id = int(category_id)

    brand_id = request.POST.get("brandId")
    if brand_id:
        product.brand_id = int(brand_id)

    product.status = request.POST.get("status", "active")
    product.show_on_site = request.POST.get("showOnSite") == "true"

    # ---------- قیمت و موجودی ----------
    product.original_price = request.POST.get("originalPrice") or 0
    product.sale_price = request.POST.get("salePrice") or 0
    product.discount_percent = request.POST.get("discount") or 0
    product.stock = request.POST.get("stock") or 0
    product.sku = request.POST.get("sku", "").strip()

    # ---------- مشخصات فیزیکی ----------
    product.weight = request.POST.get("weight") or 0
    product.length = request.POST.get("dimL") or 0
    product.width = request.POST.get("dimW") or 0
    product.height = request.POST.get("dimH") or 0

    # ---------- توضیحات ----------
    product.short_description = request.POST.get("shortDescription", "")
    product.full_description = request.POST.get("fullDescription", "")

    # ---------- SEO ----------
    product.seo_title = request.POST.get("seoTitle", "")
    product.seo_description = request.POST.get("seoDescription", "")
    product.seo_keywords = request.POST.get("seoKeywords", "")

    product.save()

    # ---------- تصاویر ----------
    images_json = request.POST.get("images", "")
    if images_json:
        images = json.loads(images_json)
        keep_ids = [img.get("id") for img in images if img.get("type") == "existing"]

        # حذف تصاویر حذف‌شده
        for img_obj in list(product.images.all()):
            if img_obj.id not in keep_ids:
                img_obj.image.delete(save=False)
                img_obj.delete()

        # افزودن / به‌روزرسانی
        for i, img in enumerate(images):
            if img.get("type") == "new":
                file = decode_data_url(img.get("dataUrl", ""))
                ProductImage.objects.create(
                    product=product, image=file,
                    is_main=img.get("isMain", False), order=i
                )
            else:
                img_obj = product.images.filter(id=img.get("id")).first()
                if img_obj:
                    img_obj.is_main = img.get("isMain", False)
                    img_obj.order = i
                    img_obj.save()

    # ---------- ویدیو ----------
    video_data = request.POST.get("videoData", "")
    if video_data:
        if product.video:
            product.video.delete(save=False)
        product.video = decode_data_url(video_data)
        product.save()

    if request.POST.get("videoRemove") == "true":
        if product.video:
            product.video.delete(save=False)
        product.video = None
        product.save()

    # ---------- مشخصات فنی ----------
    specs_json = request.POST.get("specs", "")
    if specs_json:
        specs = json.loads(specs_json)
        product.specs.all().delete()
        for i, s in enumerate(specs):
            ProductSpec.objects.create(
                product=product, key=s.get("key", ""),
                value=s.get("value", ""), order=i
            )

    # ---------- رنگ‌ها ----------
    colors_json = request.POST.get("colors", "")
    if colors_json:
        colors = json.loads(colors_json)
        product.colors.all().delete()
        for c in colors:
            ProductColor.objects.create(
                product=product, name=c.get("name", ""),
                hex_code=c.get("hex", "#000000")
            )

    # ---------- سایزها ----------
    sizes_json = request.POST.get("sizes", "")
    if sizes_json:
        sizes = json.loads(sizes_json)
        product.sizes.all().delete()
        for s in sizes:
            ProductSize.objects.create(product=product, size=s)

    return JsonResponse({"success": True, "id": product.id, "product": product.to_dict()})


@login_required
def api_product_delete(request):
    """حذف محصول"""
    if request.method != "POST":
        return JsonResponse({"success": False, "error": "متد نامعتبر"}, status=405)

    product_id = request.POST.get("id")
    product = get_object_or_404(Product, id=product_id)
    product.delete()
    return JsonResponse({"success": True})



@login_required
def brands_list(request):
    """صفحه مدیریت برندها"""
    return render(request, "admin_panel/brands.html")