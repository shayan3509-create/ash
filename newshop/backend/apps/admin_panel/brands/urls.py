from django.urls import path
from . import views

app_name = "brands"

urlpatterns = [
    path("", views.brands_list, name="list"),
    path("api/list/", views.api_brands_list, name="api_list"),
]