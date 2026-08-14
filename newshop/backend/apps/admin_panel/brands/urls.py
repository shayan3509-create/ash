from django.urls import path
from . import views

app_name = "brands"

urlpatterns = [
    path("", views.brands_list, name="list"),
    path("api/list/", views.api_brands_list, name="api_list"),
    path("api/save/", views.api_brand_save, name="api_save"),
    path("api/delete/", views.api_brand_delete, name="api_delete"),
]