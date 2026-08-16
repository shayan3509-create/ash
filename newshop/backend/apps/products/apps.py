from django.apps import AppConfig


class ProductsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.products'
    label = 'frontend_products'  # ✅ label منحصر به فرد
    verbose_name = 'محصولات (فرانت‌اند)'