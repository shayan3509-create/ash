from django.contrib import admin
from .models import Product, ProductImage, ProductSpec, ProductColor, ProductSize, Brand


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
    list_filter = ["status", "show_on_site", "category", "brand"]
    search_fields = ["name", "name_en", "sku", "slug"]
    inlines = [ProductImageInline, ProductSpecInline, ProductColorInline, ProductSizeInline]


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ["name", "name_en", "is_active"]
    search_fields = ["name", "name_en"]