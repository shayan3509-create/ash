from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.users_list, name='users_list'),
    path('create/', views.create_user, name='create_user'),
    path('edit/<int:id>/', views.update_user, name='edit_user'),
    path('delete/<int:id>/', views.delete_user, name='delete_user'),
    path('status/<int:id>/', views.change_status, name='change_status'),
]