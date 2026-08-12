from django.contrib import admin
from .models import Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "color", "order", "is_active", "updated_at")
    list_editable = ("color", "order", "is_active")
    search_fields = ("title",)