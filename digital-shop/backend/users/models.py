from django.db import models

class User(models.Model):
    ROLE_CHOICES = (
        ('admin', 'مدیر کل'),
        ('manager', 'مدیر'),
        ('editor', 'ویرایشگر'),
        ('customer', 'مشتری'),
    )
    
    STATUS_CHOICES = (
        ('active', 'فعال'),
        ('inactive', 'غیرفعال'),
        ('banned', 'مسدود'),
    )
    
    name = models.CharField(max_length=100, verbose_name='نام کامل')
    email = models.EmailField(unique=True, verbose_name='ایمیل')
    phone = models.CharField(max_length=11, unique=True, verbose_name='موبایل')
    password = models.CharField(max_length=255, verbose_name='رمز عبور')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer', verbose_name='نقش')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active', verbose_name='وضعیت')
    join_date = models.DateField(auto_now_add=True, verbose_name='تاریخ عضویت')
    last_login = models.DateTimeField(null=True, blank=True, verbose_name='آخرین ورود')
    orders_count = models.IntegerField(default=0, verbose_name='تعداد سفارشات')
    total_spent = models.BigIntegerField(default=0, verbose_name='مجموع خرید')
    
    def __str__(self):
        return self.name