from django.shortcuts import render
from apps.admin_panel.banners.models import Banner
from apps.admin_panel.categories.models import Category
from apps.admin_panel.brands.models import Brand
from apps.admin_panel.products.models import Product


def home(request):
    """صفحه اصلی فروشگاه"""
    
    # بنرهای فعال
    home_banners = [
        b.to_dict()
        for b in Banner.objects.order_by("order", "-created_at")
        if b.is_active_now()
    ]
    
    # دسته‌بندی‌های فعال
    home_categories = [
        c.to_dict()
        for c in Category.objects.filter(is_active=True).order_by("order", "-created_at")
    ]
    
    # ✅ برندهای فعال (جدید اضافه شد)
    home_brands = Brand.objects.filter(is_active=True).order_by('name')[:12]
    
    # محصولات ویژه (اختیاری - برای آینده)
    featured_products = Product.objects.filter(
        status='active',
        show_on_site=True
    ).select_related('category', 'brand').order_by('-created_at')[:8]
    
    return render(request, "shop/home.html", {
        "home_banners": home_banners,
        "home_categories": home_categories,
        "home_brands": home_brands,          # ✅ اضافه شد
        "featured_products": featured_products,  # ✅ برای آینده
    })


def custom_404(request, exception=None):
    """صفحه ۴۰۴ سفارشی"""
    return render(request, "404.html", status=404)


def test_404(request):
    """صفحه تست ۴۰۴ - فقط برای development"""
    return render(request, "404.html", status=404)