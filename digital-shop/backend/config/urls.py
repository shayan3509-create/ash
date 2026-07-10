
from django.contrib import admin
from django.urls import path,include
from core.views import home


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('users/', include('users.urls')),
    path('dashboard/', include('dashboard.urls')),
]
