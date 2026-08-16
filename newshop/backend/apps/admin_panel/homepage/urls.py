from django.urls import path
from . import views

app_name = 'homepage'

urlpatterns = [
    path('', views.homepage_sections_list, name='list'),
    path('api/list/', views.api_sections_list, name='api_list'),
    path('api/save/', views.api_section_save, name='api_save'),
    path('api/delete/', views.api_section_delete, name='api_delete'),
    path('api/reorder/', views.api_sections_reorder, name='api_reorder'),
    path('api/toggle/', views.api_section_toggle, name='api_toggle'),
]