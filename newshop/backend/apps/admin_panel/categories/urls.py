from django.urls import path
from . import views

urlpatterns = [
    path("products/categories/", views.categories, name="categories"),
]