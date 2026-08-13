from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Brand


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