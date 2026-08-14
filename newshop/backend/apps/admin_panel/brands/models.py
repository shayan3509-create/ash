from django.db import models
from django.utils.text import slugify


class Brand(models.Model):
    """برند محصولات"""
    name = models.CharField(max_length=100, unique=True, verbose_name="نام برند")
    name_en = models.CharField(max_length=100, blank=True, verbose_name="نام انگلیسی")
    slug = models.SlugField(max_length=100, unique=True, blank=True, verbose_name="اسلاگ")
    logo = models.ImageField(upload_to="brands/logos/", blank=True, null=True, verbose_name="لوگو")
    description = models.TextField(blank=True, verbose_name="توضیحات")
    website = models.URLField(blank=True, verbose_name="وب‌سایت")
    is_active = models.BooleanField(default=True, verbose_name="فعال")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="آخرین ویرایش")

    class Meta:
        ordering = ["name"]
        verbose_name = "برند"
        verbose_name_plural = "برندها"
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["is_active"]),
        ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # ساخت اسلاگ خودکار از نام انگلیسی یا فارسی
        if not self.slug:
            base_slug = slugify(self.name_en or self.name, allow_unicode=False)
            if not base_slug:
                base_slug = f"brand-{self.id or 'new'}"
            
            slug = base_slug
            counter = 1
            while Brand.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        
        super().save(*args, **kwargs)

    @property
    def products_count(self):
        """تعداد محصولات این برند"""
        try:
            return self.products.count()
        except Exception:
            return 0

    def to_dict(self):
        """تبدیل به دیکشنری برای JSON"""
        return {
            "id": self.id,
            "name": self.name,
            "nameEn": self.name_en,
            "slug": self.slug,
            "logo": self.logo.url if self.logo else None,
            "description": self.description,
            "website": self.website,
            "isActive": self.is_active,
            "productsCount": self.products_count,
            "createdAt": self.created_at.strftime("%Y/%m/%d %H:%M") if self.created_at else "",
            "updatedAt": self.updated_at.strftime("%Y/%m/%d %H:%M") if self.updated_at else "",
        }