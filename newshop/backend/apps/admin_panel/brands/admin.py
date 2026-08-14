from django.contrib import admin
from .models import Brand


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ["name", "name_en", "products_count", "is_active", "created_at"]
    list_display_links = ["name"]
    list_filter = ["is_active", "created_at"]
    search_fields = ["name", "name_en", "slug", "description"]
    prepopulated_fields = {"slug": ("name_en",)}
    list_editable = ["is_active"]
    readonly_fields = ["created_at", "updated_at", "products_count"]
    
    fieldsets = (
        ("اطلاعات اصلی", {
            "fields": ("name", "name_en", "slug", "logo", "is_active")
        }),
        ("اطلاعات تکمیلی", {
            "fields": ("description", "website"),
            "classes": ("collapse",)
        }),
        ("تاریخچه", {
            "fields": ("created_at", "updated_at", "products_count"),
        }),
    )

    def products_count(self, obj):
        return obj.products_count
    products_count.short_description = "تعداد محصولات"