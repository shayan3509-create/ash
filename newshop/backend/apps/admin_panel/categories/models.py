from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    title = models.CharField(max_length=100, verbose_name="عنوان")
    slug = models.SlugField(max_length=100, unique=True, blank=True, verbose_name="اسلاگ (URL)")
    icon = models.FileField(upload_to="categories/", blank=True, null=True, verbose_name="آیکون")
    svg_raw = models.TextField(blank=True, default="", verbose_name="محتوای خام SVG")
    color = models.CharField(max_length=20, default="#00BFFF", verbose_name="رنگ")
    link = models.CharField(max_length=500, blank=True, default="", verbose_name="لینک")
    order = models.PositiveIntegerField(default=0, verbose_name="ترتیب")
    is_active = models.BooleanField(default=True, verbose_name="فعال")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "دسته‌بندی"
        verbose_name_plural = "دسته‌بندی‌ها"

    def __str__(self):
        return self.title

    def generate_unique_slug(self):
        """ساخت slug یکتا از روی title"""
        base_slug = slugify(self.title, allow_unicode=False)
        
        # اگر title فارسی بود و slugify خروجی خالی داد
        if not base_slug:
            base_slug = f"category-{self.pk or 'new'}"
        
        slug = base_slug
        counter = 1
        # چک تکراری نبودن slug
        while Category.objects.filter(slug=slug).exclude(pk=self.pk).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        return slug

    def save(self, *args, **kwargs):
        # اگر slug خالی باشد، خودکار بساز
        if not self.slug:
            self.slug = self.generate_unique_slug()
        # لینک خودکار از slug
        self.link = f"/category/{self.slug}/"
        super().save(*args, **kwargs)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "icon": self.icon.url if self.icon else "",
            "svgRaw": self.svg_raw,
            "color": self.color,
            "link": self.link,
            "order": self.order,
            "isActive": self.is_active,
            "createdAt": self.created_at.strftime("%Y-%m-%d") if self.created_at else "",
            "updatedAt": self.updated_at.strftime("%Y-%m-%d") if self.updated_at else "",
        }