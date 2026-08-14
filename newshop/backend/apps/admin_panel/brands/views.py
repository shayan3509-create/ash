import base64
import uuid

from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.core.files.base import ContentFile

from .models import Brand


def decode_data_url(data_url):
    """تبدیل base64 data URL به فایل"""
    header, data = data_url.split(",", 1)
    ext = header.split("/")[1].split(";")[0]
    if ext == "jpeg":
        ext = "jpg"
    return ContentFile(base64.b64decode(data), name=f"{uuid.uuid4().hex}.{ext}")


@login_required
def brands_list(request):
    """صفحه مدیریت برندها"""
    return render(request, "admin_panel/brands.html")


@login_required
def api_brands_list(request):
    """لیست همه برندها"""
    brands = Brand.objects.all()
    return JsonResponse({
        "success": True,
        "brands": [b.to_dict() for b in brands],
    })


@login_required
def api_brand_save(request):
    """ایجاد / ویرایش برند"""
    if request.method != "POST":
        return JsonResponse({"success": False, "error": "متد نامعتبر"}, status=405)

    brand_id = request.POST.get("id")
    brand = get_object_or_404(Brand, id=brand_id) if brand_id else Brand()

    name = request.POST.get("name", "").strip()
    if not name:
        return JsonResponse({"success": False, "error": "نام برند الزامی است"}, status=400)

    brand.name = name
    brand.name_en = request.POST.get("nameEn", "").strip()
    brand.is_active = request.POST.get("isActive") == "true"
    
    slug = request.POST.get("slug", "").strip()
    if slug:
        brand.slug = slug
    
    # اگر لوگوی جدید ارسال شده
    logo_data = request.POST.get("logoData", "")
    if logo_data:
        if brand.logo:
            brand.logo.delete(save=False)
        brand.logo = decode_data_url(logo_data)
    
    # اگر لوگو حذف شده
    if request.POST.get("logoRemove") == "true":
        if brand.logo:
            brand.logo.delete(save=False)
        brand.logo = None

    brand.save()

    return JsonResponse({
        "success": True,
        "id": brand.id,
        "brand": brand.to_dict()
    })


@login_required
def api_brand_delete(request):
    """حذف برند"""
    if request.method != "POST":
        return JsonResponse({"success": False, "error": "متد نامعتبر"}, status=405)

    brand_id = request.POST.get("id")
    brand = get_object_or_404(Brand, id=brand_id)
    
    if brand.logo:
        brand.logo.delete(save=False)
    
    brand.delete()
    return JsonResponse({"success": True})