from django.db import models
from apps.admin_panel.products.models import Product


class HomepageSection(models.Model):
    """بخش‌های صفحه اصلی"""
    
    # انواع بخش‌ها
    TYPE_CHOICES = [
        # بخش‌های پیش‌فرض (غیرقابل حذف)
        ('banners', 'بنرها'),
        ('categories', 'دسته‌بندی‌ها'),
        ('flash_sale', 'پیشنهاد شگفت‌انگیز'),
        ('brands', 'برندها'),
        # بخش‌های قابل ساخت
        ('bestsellers', 'پرفروش‌ترین‌ها'),
        ('most_discounted', 'بیشترین تخفیف'),
        ('least_sellers', 'کم‌فروش‌ترین‌ها'),
        ('newest', 'جدیدترین‌ها'),
        ('discounted', 'محصولات تخفیف‌دار'),
        ('manual', 'انتخاب دستی'),
    ]
    
    DEFAULT_TYPES = ['banners', 'categories', 'flash_sale', 'brands']
    
    title = models.CharField(max_length=100, verbose_name="عنوان بخش")
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, verbose_name="نوع بخش")
    is_active = models.BooleanField(default=True, verbose_name="فعال")
    order = models.PositiveIntegerField(default=0, verbose_name="ترتیب نمایش")
    
    # برای بخش‌های قابل ساخت
    auto_mode = models.BooleanField(default=True, verbose_name="انتخاب خودکار")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'بخش صفحه اصلی'
        verbose_name_plural = 'بخش‌های صفحه اصلی'
    
    def __str__(self):
        return f"{self.title} ({self.get_type_display()})"
    
    @property
    def is_default(self):
        return self.type in self.DEFAULT_TYPES
    
    def to_dict(self):
        manual_products = []
        for mp in self.manual_products.all().order_by('order'):
            if mp.product:
                manual_products.append({
                    'id': mp.product.id,
                    'name': mp.product.name,
                    'sku': mp.product.sku,
                    'price': float(mp.product.sale_price or mp.product.original_price or 0),
                    'image': mp.product.main_image if hasattr(mp.product, 'main_image') else None
                })
        
        return {
            'id': self.id,
            'type': self.type,
            'title': self.title,
            'isActive': self.is_active,
            'order': self.order,
            'autoMode': self.auto_mode,
            'manualProducts': manual_products,
            'isDefault': self.is_default,
        }


class SectionManualProduct(models.Model):
    """محصولات دستی اضافه شده به بخش"""
    
    section = models.ForeignKey(
        HomepageSection,
        on_delete=models.CASCADE,
        related_name='manual_products',
        verbose_name="بخش"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='in_homepage_sections',
        verbose_name="محصول"
    )
    order = models.PositiveIntegerField(default=0, verbose_name="ترتیب")
    added_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'محصول دستی بخش'
        verbose_name_plural = 'محصولات دستی بخش'
        unique_together = ['section', 'product']
    
    def __str__(self):
        return f"{self.section.title} - {self.product.name}"