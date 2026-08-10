from django.shortcuts import render
from apps.admin_panel.models import Banner


def home(request):
    home_banners = [
        b.to_dict()
        for b in Banner.objects.order_by("order", "-created_at")
        if b.is_active_now()
    ]
    return render(request, "shop/home.html", {"home_banners": home_banners})