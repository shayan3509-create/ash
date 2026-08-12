import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import Category


def _category_post(request):
    action = request.POST.get("action")

    # ---------- ذخیره ترتیب ----------
    if action == "save_order":
        try:
            order_ids = json.loads(request.POST.get("order", "[]"))
            for position, cat_id in enumerate(order_ids, start=1):
                Category.objects.filter(id=cat_id).update(order=position)
            return JsonResponse({"success": True})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=400)

    # ---------- حذف ----------
    if action == "delete":
        cat = get_object_or_404(Category, id=request.POST.get("id"))
        cat.delete()
        return JsonResponse({"success": True})

    # ---------- ایجاد / ویرایش ----------
        # ---------- ایجاد / ویرایش ----------
    cat_id = request.POST.get("id")
    cat = get_object_or_404(Category, id=cat_id) if cat_id else Category()

    title = request.POST.get("title", "").strip()
    if not title:
        return JsonResponse({"success": False, "error": "عنوان الزامی است"}, status=400)

    cat.title = title
    cat.slug = request.POST.get("slug", "").strip()  # اگر خالی باشد، در save خودکار ساخته می‌شود
    cat.color = request.POST.get("color", "#00BFFF").strip() or "#00BFFF"
    cat.is_active = request.POST.get("is_active") == "true"

    icon = request.FILES.get("icon")
    if icon:
        cat.icon = icon
        if icon.name.lower().endswith('.svg'):
            try:
                svg_content = icon.read().decode('utf-8')
                cat.svg_raw = svg_content
            except Exception:
                cat.svg_raw = ""

    cat.save()  # در save، slug و link خودکار ساخته می‌شوند
    return JsonResponse({"success": True, "id": cat.id})

@login_required
@ensure_csrf_cookie
def categories(request):
    if request.method == "POST":
        return _category_post(request)

    categories_data = [c.to_dict() for c in Category.objects.order_by("order", "-created_at")]
    return render(request, "admin_panel/products/categories.html", {"categories_data": categories_data})