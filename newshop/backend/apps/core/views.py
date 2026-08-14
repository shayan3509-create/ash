from django.shortcuts import render
from apps.admin_panel.banners.models import Banner
from apps.admin_panel.categories.models import Category


def home(request):
    home_banners = [
        b.to_dict()
        for b in Banner.objects.order_by("order", "-created_at")
        if b.is_active_now()
    ]
    
    # ✅ اضافه شد: دسته‌بندی‌های فعال از دیتابیس
    home_categories = [
        c.to_dict()
        for c in Category.objects.filter(is_active=True).order_by("order", "-created_at")
    ]
    
    return render(request, "shop/home.html", {
        "home_banners": home_banners,
        "home_categories": home_categories,
    })




def custom_404(request, exception=None):
    """صفحه ۴۰۴ سفارشی"""
    return render(request, "404.html", status=404)


def test_404(request):
    """صفحه تست ۴۰۴ - فقط برای development"""
    return render(request, "404.html", status=404)