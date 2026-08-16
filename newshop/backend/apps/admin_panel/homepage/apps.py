from django.apps import AppConfig


class HomepageConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.admin_panel.homepage'
    label = 'admin_homepage'  # ✅ label منحصر به فرد برای جلوگیری از تداخل
    verbose_name = 'مدیریت صفحه اصلی (ادمین)'