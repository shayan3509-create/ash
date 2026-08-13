from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify
from apps.admin_panel.categories.models import Category


class Brand(models.Model):
    """برند محصولات"""
    name = models.CharField(max_length=100, unique=True, verbose_name="نام برند")
    name_en = models.CharField(max_length=100, blank=True, verbose_name="نام انگلیسی")
    slug = models.SlugField(max_length=100, unique=True, blank=True, verbose_name="اسلاگ")
    logo = models.ImageField(upload_to="brands/", blank=True, null=True, verbose_name="لوگو")
    is_active = models.BooleanField(default=True, verbose_name="فعال")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "برند"
        verbose_name_plural = "برندها"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name_en or self.name, allow_unicode=False)
            slug = base_slug
            counter = 1
            while Brand.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "nameEn": self.name_en,
            "slug": self.slug,
            "isActive": self.is_active,
        }


class Product(models.Model):
    """محصول"""
    STATUS_CHOICES = [
        ("active", "فعال"),
        ("inactive", "غیرفعال"),
    ]

    # اطلاعات اصلی
    name = models.CharField(max_length=200, verbose_name="نام محصول")
    name_en = models.CharField(max_length=200, blank=True, verbose_name="نام انگلیسی")
    slug = models.SlugField(max_length=200, unique=True, blank=True, verbose_name="اسلاگ")
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        related_name="products",
        verbose_name="دسته‌بندی"
    )
    brand = models.ForeignKey(
        Brand, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name="products",
        verbose_name="برند"
    )
    
    # وضعیت
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default="active",
        verbose_name="وضعیت"
    )
    show_on_site = models.BooleanField(default=True, verbose_name="نمایش در سایت")
    
    # قیمت و موجودی
    original_price = models.DecimalField(
        max_digits=12, 
        decimal_places=0, 
        default=0,
        validators=[MinValueValidator(0)],
        verbose_name="قیمت اصلی (تومان)"
    )
    sale_price = models.DecimalField(
        max_digits=12, 
        decimal_places=0, 
        default=0,
        validators=[MinValueValidator(0)],
        verbose_name="قیمت فروش (تومان)"
    )
    discount_percent = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name="درصد تخفیف"
    )
    stock = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)],
        verbose_name="موجودی"
    )
    sku = models.CharField(max_length=50, blank=True, verbose_name="کد محصول (SKU)")
    
    # مشخصات فیزیکی
    weight = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)],
        verbose_name="وزن (گرم)"
    )
    length = models.DecimalField(
        max_digits=6, 
        decimal_places=2, 
        default=0,
        validators=[MinValueValidator(0)],
        verbose_name="طول (سانتی‌متر)"
    )
    width = models.DecimalField(
        max_digits=6, 
        decimal_places=2, 
        default=0,
        validators=[MinValueValidator(0)],
        verbose_name="عرض (سانتی‌متر)"
    )
    height = models.DecimalField(
        max_digits=6, 
        decimal_places=2, 
        default=0,
        validators=[MinValueValidator(0)],
        verbose_name="ارتفاع (سانتی‌متر)"
    )
    
    # توضیحات
    short_description = models.TextField(blank=True, verbose_name="توضیحات کوتاه")
    full_description = models.TextField(blank=True, verbose_name="توضیحات کامل")
    
    # SEO
    seo_title = models.CharField(max_length=70, blank=True, verbose_name="عنوان SEO")
    seo_description = models.TextField(max_length=160, blank=True, verbose_name="توضیحات SEO")
    seo_keywords = models.CharField(max_length=255, blank=True, verbose_name="کلمات کلیدی SEO")
    
    # ویدیو
    video = models.FileField(upload_to="products/videos/", blank=True, null=True, verbose_name="ویدیو")
    
    # تاریخ‌ها
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="آخرین ویرایش")

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "محصول"
        verbose_name_plural = "محصولات"
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["status", "show_on_site"]),
            models.Index(fields=["category"]),
        ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        from django.utils.text import slugify
        
        # اگر slug خالی بود، از نام بساز؛ وگرنه همان را تمیز کن
        if not self.slug:
            base_slug = slugify(self.name_en or self.name, allow_unicode=False)
        else:
            base_slug = slugify(self.slug, allow_unicode=False)
        
        slug = base_slug
        counter = 1
        while Product.objects.filter(slug=slug).exclude(pk=self.pk).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        self.slug = slug
        
        # محاسبه قیمت فروش اگر خالی باشد
        if not self.sale_price and self.original_price:
            discount_amount = (self.original_price * self.discount_percent) / 100
            self.sale_price = self.original_price - discount_amount
        
        super().save(*args, **kwargs)
        

    @property
    def is_low_stock(self):
        """بررسی کم‌موجود بودن"""
        return self.stock < 10 and self.status == "active"

    @property
    def main_image(self):
        """تصویر اصلی محصول"""
        main = self.images.filter(is_main=True).first()
        if main:
            return main.image.url
        first = self.images.first()
        return first.image.url if first else None

    def to_dict(self):
        """تبدیل به دیکشنری برای JSON"""
        from datetime import datetime
        
        # تبدیل تاریخ میلادی به شمسی
        def to_shamsi(dt):
            if not dt:
                return ""
            try:
                # الگوریتم ساده تبدیل (می‌توانی از کتابخانه jdatetime استفاده کنی)
                return dt.strftime("%Y/%m/%d %H:%M")
            except:
                return ""
        
        # جمع‌آوری تصاویر
        images_data = []
        for img in self.images.all():
            images_data.append({
                "id": img.id,
                "url": img.image.url if img.image else "",
                "isMain": img.is_main,
            })
        
        # جمع‌آوری مشخصات
        specs_data = [{"key": s.key, "value": s.value} for s in self.specs.all()]
        
        # جمع‌آوری رنگ‌ها
        colors_data = [{"name": c.name, "hex": c.hex_code} for c in self.colors.all()]
        
        # جمع‌آوری سایزها
        sizes_data = [s.size for s in self.sizes.all()]
        
        return {
            "id": self.id,
            "name": self.name,
            "nameEn": self.name_en,
            "slug": self.slug,
            "category": self.category.title if self.category else "",
            "categoryId": self.category.id if self.category else None,
            "brand": self.brand.name if self.brand else "",
            "brandId": self.brand.id if self.brand else None,
            "status": self.status,
            "showOnSite": self.show_on_site,
            "originalPrice": int(self.original_price) if self.original_price else 0,
            "salePrice": int(self.sale_price) if self.sale_price else 0,
            "discount": self.discount_percent,
            "stock": self.stock,
            "sku": self.sku,
            "images": images_data,
            "video": self.video.url if self.video else None,
            "shortDescription": self.short_description,
            "fullDescription": self.full_description,
            "specs": specs_data,
            "colors": colors_data,
            "sizes": sizes_data,
            "weight": self.weight,
            "dimensions": {
                "l": float(self.length) if self.length else 0,
                "w": float(self.width) if self.width else 0,
                "h": float(self.height) if self.height else 0,
            },
            "seoTitle": self.seo_title,
            "seoDescription": self.seo_description,
            "seoKeywords": self.seo_keywords,
            "createdAt": to_shamsi(self.created_at),
            "updatedAt": to_shamsi(self.updated_at),
        }


class ProductImage(models.Model):
    """تصاویر محصول"""
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE, 
        related_name="images",
        verbose_name="محصول"
    )
    image = models.ImageField(upload_to="products/images/", verbose_name="تصویر")
    is_main = models.BooleanField(default=False, verbose_name="تصویر اصلی")
    order = models.IntegerField(default=0, verbose_name="ترتیب")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-is_main", "order"]
        verbose_name = "تصویر محصول"
        verbose_name_plural = "تصاویر محصول"

    def __str__(self):
        return f"{self.product.name} - {'اصلی' if self.is_main else 'ثانویه'}"


class ProductSpec(models.Model):
    """مشخصات فنی محصول"""
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE, 
        related_name="specs",
        verbose_name="محصول"
    )
    key = models.CharField(max_length=100, verbose_name="عنوان")
    value = models.CharField(max_length=255, verbose_name="مقدار")
    order = models.IntegerField(default=0, verbose_name="ترتیب")

    class Meta:
        ordering = ["order"]
        verbose_name = "مشخصه فنی"
        verbose_name_plural = "مشخصات فنی"

    def __str__(self):
        return f"{self.product.name}: {self.key}"


class ProductColor(models.Model):
    """رنگ‌های محصول"""
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE, 
        related_name="colors",
        verbose_name="محصول"
    )
    name = models.CharField(max_length=50, verbose_name="نام رنگ")
    hex_code = models.CharField(max_length=7, default="#000000", verbose_name="کد HEX")

    class Meta:
        verbose_name = "رنگ محصول"
        verbose_name_plural = "رنگ‌های محصول"

    def __str__(self):
        return f"{self.product.name}: {self.name}"


class ProductSize(models.Model):
    """سایزهای محصول"""
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE, 
        related_name="sizes",
        verbose_name="محصول"
    )
    size = models.CharField(max_length=20, verbose_name="سایز")

    class Meta:
        verbose_name = "سایز محصول"
        verbose_name_plural = "سایزهای محصول"

    def __str__(self):
        return f"{self.product.name}: {self.size}"