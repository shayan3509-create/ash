from django.urls import path, include

app_name = "admin_panel"

urlpatterns = [
    path("", include("apps.admin_panel.dashboard.urls")),
    path("", include("apps.admin_panel.banners.urls")),
    path("", include("apps.admin_panel.categories.urls")),
]