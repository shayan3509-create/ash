import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.utils.dateparse import parse_date
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import Banner


def _banner_post(request):
    action = request.POST.get("action")

    if action == "save_order":
        try:
            order_ids = json.loads(request.POST.get("order", "[]"))
            for position, banner_id in enumerate(order_ids, start=1):
                Banner.objects.filter(id=banner_id).update(order=position)
            return JsonResponse({"success": True})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=400)

    if action == "delete":
        banner = get_object_or_404(Banner, id=request.POST.get("id"))
        banner.delete()
        return JsonResponse({"success": True})

    banner_id = request.POST.get("id")
    banner = get_object_or_404(Banner, id=banner_id) if banner_id else Banner()

    title = request.POST.get("title", "").strip()
    if not title:
        return JsonResponse({"success": False, "error": "عنوان الزامی است"}, status=400)

    banner_file = request.FILES.get("file")
    mobile_file = request.FILES.get("mobile_file")

    if not banner_id and not banner_file:
        return JsonResponse({"success": False, "error": "انتخاب فایل دسکتاپ الزامی است"}, status=400)

    banner.title = title
    if banner_file:
        banner.file = banner_file
        banner.banner_type = request.POST.get("banner_type", "image")
    if mobile_file:
        banner.mobile_file = mobile_file

    banner.link = request.POST.get("link", "").strip()
    banner.new_tab = request.POST.get("new_tab") == "true"
    banner.status = request.POST.get("status", "active")

    start = request.POST.get("start_date") or None
    banner.start_date = parse_date(start) if start else None
    end = request.POST.get("end_date") or None
    banner.end_date = parse_date(end) if end else None

    banner.seo_title = request.POST.get("seo_title", "").strip()
    banner.seo_description = request.POST.get("seo_description", "").strip()

    banner.save()
    return JsonResponse({"success": True, "id": banner.id})


@login_required
@ensure_csrf_cookie
def banners(request):
    if request.method == "POST":
        return _banner_post(request)

    banners_data = [b.to_dict() for b in Banner.objects.order_by("order", "-created_at")]
    return render(request, "admin_panel/banners.html", {"banners_data": banners_data})

