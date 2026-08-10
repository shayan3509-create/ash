from django.contrib import admin
from .models import Banner


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ("title", "banner_type", "status", "order", "updated_at")
    list_editable = ("status", "order")
    search_fields = ("title",)