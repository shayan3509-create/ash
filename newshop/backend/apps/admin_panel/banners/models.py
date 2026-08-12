from django.db import models
from django.utils import timezone


class Banner(models.Model):
    TYPE_CHOICES = [("image", "تصویر"), ("video", "ویدیو")]
    STATUS_CHOICES = [("active", "فعال"), ("inactive", "غیرفعال"), ("scheduled", "زمان‌بندی شده")]

    title = models.CharField(max_length=200, verbose_name="عنوان")
    file = models.FileField(upload_to="banners/", verbose_name="فایل بنر دسکتاپ")
    mobile_file = models.FileField(upload_to="banners/", blank=True, null=True, verbose_name="فایل بنر موبایل (اختیاری)")
    banner_type = models.CharField(max_length=10, choices=TYPE_CHOICES, default="image", verbose_name="نوع")
    link = models.CharField(max_length=500, blank=True, default="", verbose_name="لینک مقصد")
    new_tab = models.BooleanField(default=False, verbose_name="باز شدن در تب جدید")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="active", verbose_name="وضعیت")
    start_date = models.DateField(null=True, blank=True, verbose_name="تاریخ شروع")
    end_date = models.DateField(null=True, blank=True, verbose_name="تاریخ پایان")
    order = models.PositiveIntegerField(default=0, verbose_name="ترتیب")
    seo_title = models.CharField(max_length=70, blank=True, default="", verbose_name="عنوان سئو")
    seo_description = models.TextField(max_length=160, blank=True, default="", verbose_name="توضیحات سئو")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "بنر"
        verbose_name_plural = "بنرها"

    def __str__(self):
        return self.title

    def is_active_now(self):
        if self.status == "inactive":
            return False
        today = timezone.localdate()
        if self.status == "scheduled":
            if self.start_date and today < self.start_date:
                return False
            if self.end_date and today > self.end_date:
                return False
        return True

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "type": self.banner_type,
            "src": self.file.url if self.file else "",
            "mobileSrc": self.mobile_file.url if self.mobile_file else (self.file.url if self.file else ""),
            "link": self.link,
            "newTab": self.new_tab,
            "status": self.status,
            "startDate": self.start_date.isoformat() if self.start_date else "",
            "endDate": self.end_date.isoformat() if self.end_date else "",
            "order": self.order,
            "seoTitle": self.seo_title,
            "seoDescription": self.seo_description,
            "updatedAt": self.updated_at.strftime("%Y-%m-%d"),
        }