from django.urls import path
from . import views

app_name = "products"

urlpatterns = [
    path("", views.products_list, name="list"),
    
    # صفحه برندها
    
    
    # API ها
    path("api/list/", views.api_products_list, name="api_list"),
    path("api/save/", views.api_product_save, name="api_save"),
    path("api/delete/", views.api_product_delete, name="api_delete"),
    
]