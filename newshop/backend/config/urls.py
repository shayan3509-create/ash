from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render


# ✅ تعریف تابع ۴۰۴ سفارشی (باید قبل از handler404 باشد)
def custom_404(request, exception=None):
    return render(request, "404.html", status=404)


# ✅ تابع تستی برای دیدن صفحه ۴۰ در حالت development
def test_404(request):
    return render(request, "404.html", status=404)


# ✅ ثبت هندلر ۴۰۴ سفارشی
handler404 = custom_404


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("apps.core.urls")),
    path("admin-panel/", include("apps.admin_panel.urls")),
    path('test-404/', test_404, name='test_404'),
    path('product/', include('apps.products.urls')),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)