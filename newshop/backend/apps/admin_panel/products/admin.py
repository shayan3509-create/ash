from django.contrib import admin
from .models import Product, ProductImage, ProductSpec, ProductColor, ProductSize


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductSpecInline(admin.TabularInline):
    model = ProductSpec
    extra = 1


class ProductColorInline(admin.TabularInline):
    model = ProductColor
    extra = 1


class ProductSizeInline(admin.TabularInline):
    model = ProductSize
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "brand", "category", "sale_price", "stock", "status", "show_on_site"]
    list_display_links = ["name"]
    list_filter = ["status", "show_on_site", "category", "brand"]
    search_fields = ["name", "name_en", "sku", "slug"]
    list_editable = ["status", "show_on_site", "stock"]
    readonly_fields = ["created_at", "updated_at"]
    inlines = [ProductImageInline, ProductSpecInline, ProductColorInline, ProductSizeInline]

    fieldsets = (
        ("اطلاعات اصلی", {
            "fields": ("name", "name_en", "slug", "category", "brand", "status", "show_on_site")
        }),
        ("قیمت و موجودی", {
            "fields": ("original_price", "sale_price", "discount_percent", "stock", "sku")
        }),
        ("مشخصات فیزیکی", {
            "fields": ("weight", "length", "width", "height"),
            "classes": ("collapse",)
        }),
        ("توضیحات", {
            "fields": ("short_description", "full_description"),
            "classes": ("collapse",)
        }),
        ("SEO", {
            "fields": ("seo_title", "seo_description", "seo_keywords"),
            "classes": ("collapse",)
        }),
        ("رسانه", {
            "fields": ("video",)
        }),
        ("تاریخچه", {
            "fields": ("created_at", "updated_at"),
        }),
    )