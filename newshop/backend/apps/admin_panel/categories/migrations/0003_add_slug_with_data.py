from django.db import migrations, models


def fill_slugs(apps, schema_editor):
    """برای رکوردهای موجود، slug خودکار بساز"""
    Category = apps.get_model('categories', 'Category')
    for cat in Category.objects.all():
        if not cat.slug:
            cat.slug = f"category-{cat.id}"
            cat.save(update_fields=['slug'])


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0002_category_svg_raw'),
    ]

    operations = [
        # ۱. فیلد slug را بدون unique اضافه کن (تا خطا ندهد)
        migrations.AddField(
            model_name='category',
            name='slug',
            field=models.SlugField(blank=True, max_length=100, null=True, verbose_name='اسلاگ (URL)'),
        ),
        # ۲. slug ها را برای رکوردهای موجود پر کن
        migrations.RunPython(fill_slugs, reverse_code=migrations.RunPython.noop),
        # ۳. حالا unique و not null را اضافه کن
        migrations.AlterField(
            model_name='category',
            name='slug',
            field=models.SlugField(blank=True, max_length=100, unique=True, verbose_name='اسلاگ (URL)'),
        ),
    ]