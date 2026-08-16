from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    # صفحه جزئیات محصول با slug
    path('<slug:slug>/', views.product_detail, name='detail'),
]