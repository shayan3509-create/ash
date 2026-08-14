my edit

 git add .
 git commit -m "arad"
 git push





  cd .\newshop\backend\       

 python -m venv aradvenv

  .\venv\Scripts\activate      
  .\aradvenv\Scripts\activate 
pip install django --timeout 120
python -m pip install django-jazzmin
   python manage.py runserver 




بخش جدا شناسه ویرایش آیکون اس وی حی محصولات داخل حذف 











http://127.0.0.1:8000/

http://127.0.0.1:8000/admin-panel/






http://127.0.0.1:8000/admin-panel/homepage/








http://127.0.0.1:8000/admin-panel/banners/





آراد اگه اینو میبینی باید به شایان بدی 










این صفحه **«مدیریت صفحه اصلی»** در واقع یک **سیستم مدیریت چیدمان (Layout Builder)** است که به مدیر فروشگاه اجازه می‌دهد ساختار، ترتیب و محتوای صفحه اول سایت را بدون نیاز به کدنویسی یا دسترسی به سرور، مستقیماً از پنل مدیریت کنترل کند.

در ادامه، عملکرد این صفحه را از ۰ تا ۱۰۰ با تمام جزئیات فنی و منطقی توضیح می‌دهم:

---

### ۱. هدف کلی سیستم
صفحه اصلی فروشگاه از چندین «بخش» (Section) تشکیل شده است (مثل بنرها، دسته‌بندی‌ها، پرفروش‌ترین‌ها و...). این صفحه به مدیر اجازه می‌دهد:
-   **چه بخش‌هایی** نمایش داده شوند.
-   **با چه ترتیبی** نمایش داده شوند.
-   **چه محتوایی** داخل هر بخش باشد.
-   **کدام بخش‌ها موقتاً مخفی شوند** (بدون حذف شدن).

---

### ۲. انواع بخش‌ها و رفتار آن‌ها

سیستم دو نوع بخش دارد که رفتار کاملاً متفاوتی دارند:

#### الف) بخش‌های پیش‌فرض (غیرقابل حذف / غیرقابل ویرایش محتوا)
این ۳ بخش همیشه در سیستم وجود دارند و ستون فقرات صفحه اصلی هستند:
| بخش | قابلیت ویرایش | قابلیت حذف | توضیح |
|---|---|---|---|
| **بنرها** | ❌ فقط فعال/غیرفعال | ❌ | محتوا از صفحه «مدیریت بنرها» خوانده می‌شود |
| **دسته‌بندی‌ها** | ❌ فقط فعال/غیرفعال | ❌ | محتوا از صفحه «مدیریت دسته‌بندی‌ها» خوانده می‌شود |
| **برندها** | ❌ فقط فعال/غیرفعال | ❌ | محتوا از صفحه «مدیریت برندها» خوانده می‌شود |

> **نکته کلیدی:** وقتی مدیر روی دکمه ویرایش این بخش‌ها کلیک می‌کند، مودالی باز می‌شود که **فقط** یک سوئیچ فعال/غیرفعال دارد. هیچ تنظیمات دیگری قابل تغییر نیست.

#### ب) بخش‌های قابل ساخت (CRUD کامل)
این بخش‌ها را مدیر می‌تواند ایجاد، ویرایش و حذف کند:
| نوع | انتخاب خودکار محصول | محصولات دستی | عنوان قابل ویرایش |
|---|---|---|---|
| **پرفروش‌ترین‌ها** | ✅ بر اساس فروش | ✅ اضافه/حذف/ترتیب | ✅ |
| **جدیدترین‌ها** | ✅ بر اساس تاریخ | ✅ اضافه/حذف/ترتیب | ✅ |
| **محصولات تخفیف‌دار** | ✅ دارای تخفیف فعال | ✅ اضافه/حذف/ترتیب | ✅ |
| **محصولات منتخب** | ✅ علامت‌گذاری شده | ✅ اضافه/حذف/ترتیب | ✅ |
| **بخش سفارشی** | ❌ | ✅ فقط دستی | ✅ عنوان دلخواه |

---

### ۳. جریان کامل عملیات (از ۰ تا ۱۰۰)

#### مرحله ۱: بارگذاری اولیه
```
مرورگر باز می‌شود → localStorage خوانده می‌شود
    ├── اگر داده وجود داشت → آرایه sections پر می‌شود
    └── اگر خالی بود → ۴ بخش پیش‌فرض ساخته و ذخیره می‌شوند
        ├── بنرها (order: 1)
        ├── دسته‌بندی‌ها (order: 2)
        ├── برندها (order: 3)
        └── پرفروش‌ترین‌ها (order: 4, autoMode: true)
```

#### مرحله ۲: نمایش لیست بخش‌ها
هر بخش شامل این اطلاعات است:
-   **Handle Drag (☰):** فقط در حالت «ویرایش ترتیب» ظاهر می‌شود
-   **نام بخش + نوع**
-   **Badge وضعیت:** فعال (سبز) / غیرفعال (قرمز)
-   **دکمه ویرایش (✏️):** برای همه بخش‌ها یکسان
-   **دکمه حذف (🗑️):** فقط برای بخش‌های غیرپیش‌فرض

#### مرحله ۳: تغییر ترتیب (Drag & Drop)
```
کلیک روی «ویرایش ترتیب»
    → Handle ها ظاهر می‌شوند
    → draggable="true" روی همه آیتم‌ها
    → کاربر آیتم A را روی آیتم B رها می‌کند
        → splice(fromIndex, 1) → splice(toIndex, 0, moved)
        → Renumber: همه order ها از ۱ تا N بازنویسی می‌شوند
        → saveSections() → localStorage آپدیت می‌شود
        → Toast: «ترتیب بخش‌ها به‌روز شد»
    → کلیک روی «ذخیره ترتیب»
        → Handle ها مخفی می‌شوند
        → draggable="false"
```

#### مرحله ۴: فعال / غیرفعال کردن
```
کلیک روی ویرایش بخش پیش‌فرض
    → مودال باز می‌شود (فقط سوئیچ + پیام اطلاع‌رسانی)
    → کاربر سوئیچ را خاموش می‌کند
    → ذخیره → فقط sec.isActive = false
    → بخش در لیست باقی می‌ماند ولی badge قرمز می‌شود
    → صفحه اصلی فروشگاه این بخش را render نمی‌کند
```

#### مرحله ۵: ویرایش بخش قابل ساخت
```
کلیک روی ویرایش «پرفروش‌ترین‌ها»
    → resetForm() پاکسازی کامل متغیرها و DOM
    → currentEditId = sec.id ← 🔑 کلید تشخیص ویرایش از ایجاد
    → fieldType مخفی می‌شود (نوع قابل تغییر نیست)
    → title و products بارگذاری می‌شوند
    → کاربر تغییرات را اعمال می‌کند
    → کلیک ذخیره:
        isEditing = !!currentEditId → true
        existingSection.title = newTitle
        existingSection.manualProducts = [...]
        → NO push() → NO genId() → فقط mutate
        → saveSections()
```

#### مرحله ۶: ایجاد بخش جدید
```
کلیک روی «ایجاد بخش»
    → resetForm() پاکسازی کامل
    → currentEditId = null ← 🔑 کلید تشخیص ایجاد
    → fieldType نمایش داده می‌شود + required
    → کاربر نوع را انتخاب می‌کند
        → onTypeChange() عنوان پیش‌فرض را ست می‌کند
        → showConfigForType() تنظیمات مربوطه را نشان می‌دهد
    → کلیک ذخیره:
        isEditing = !!currentEditId → false
        → sections.push({ id: genId(), order: maxOrder+1, ... })
        → saveSections()
```

#### مرحله ۷: جستجو و افزودن محصول دستی
```
تایپ در input جستجو
    → debounce 200ms
    → filter روی SAMPLE_PRODUCTS (یا API واقعی)
    → Dropdown نمایش نتایج
        → محصول قبلاً اضافه شده؟ opacity:0.4 + pointer-events:none
    → کلیک روی نتیجه
        → tempManualProducts.push({...})
        → renderManualProducts()
        → Input پاک + Dropdown بسته
```

#### مرحله ۸: حذف بخش
```
کلیک روی 🗑️
    → Guard: DEFAULT_TYPES.includes(type) → return (محافظت)
    → Modal تأیید باز می‌شود
    → کلیک حذف:
        sections = sections.filter(s => s.id !== id)
        → Renumber: order ها از ۱ تا N-1 بازنویسی
        → saveSections()
        → Toast: «بخش حذف شد»
```

---

### ۴. معماری ذخیره‌سازی

تمام داده‌ها در **یک کلید localStorage** ذخیره می‌شوند:

```json
// localStorage key: admin_homepage_sections_v10
[
  {
    "id": "m1abc2def",
    "type": "banners",
    "title": "بنرها",
    "isActive": true,
    "order": 1,
    "selectedItems": [],
    "autoMode": false,
    "manualProducts": []
  },
  {
    "id": "n3ghi4jkl",
    "type": "bestsellers",
    "title": "پرفروش‌ترین‌ها",
    "isActive": true,
    "order": 4,
    "selectedItems": [],
    "autoMode": true,
    "manualProducts": [
      { "id": 102, "name": "گوشی اپل iPhone 15 Pro", "sku": "IP15PRO", "price": 75000000 }
    ]
  }
]
```

---

### ۵. نحوه مصرف توسط صفحه اصلی فروشگاه

صفحه اصلی فروشگاه (Frontend) باید این مراحل را طی کند:

```javascript
// 1. خواندن داده
const sections = JSON.parse(localStorage.getItem('admin_homepage_sections_v10'));

// 2. فیلتر و مرتب‌سازی
const visibleSections = sections
  .filter(s => s.isActive)
  .sort((a, b) => a.order - b.order);

// 3. Render هر بخش
visibleSections.forEach(section => {
  switch(section.type) {
    case 'banners':     renderBanners(section); break;
    case 'categories':  renderCategories(section); break;
    case 'brands':      renderBrands(section); break;
    case 'bestsellers': renderProductGrid(section, getBestSellers()); break;
    case 'newest':      renderProductGrid(section, getNewest()); break;
    case 'discounted':  renderProductGrid(section, getDiscounted()); break;
    case 'featured':    renderProductGrid(section, getFeatured()); break;
    case 'custom':      renderProductGrid(section, []); break; // فقط دستی
  }
});
```

> **نکته مهم برای Frontend:** برای بخش‌های خودکار، ابتدا محصولات خودکار بارگذاری می‌شوند، سپس `section.manualProducts` به ابتدای لیست اضافه می‌شوند (اولویت بالاتر).

---

### ۶. مکانیزم‌های محافظتی و جلوگیری از باگ

| مکانیزم | مشکل جلوگیری‌شده |
|---|---|
| `resetForm()` در ابتدای open و close | باقی ماندن داده‌های ویرایش قبلی در مودال ایجاد |
| `isEditing = !!currentEditId` | ایجاد رکورد جدید به جای ویرایش |
| `existingSection` reference | Mutate مستقیم بدون نیاز به find مجدد |
| Guard در `requestDeleteSection` | حذف تصادفی بخش‌های پیش‌فرض |
| Guard در `openSectionModal` | باز شدن مودال ویرایش برای بخش‌های پیش‌فرض |
| اعتبارسنجی دستی در `saveSection` | بلاک شدن submit توسط فیلد مخفی required |
| Renumber بعد از هر reorder/delete | گپ در شماره ترتیب‌ها |
| Debounce روی جستجوی محصول | درخواست‌های بیش از حد |

این سیستم به گونه‌ای طراحی شده که **صفحه اصلی فروشگاه دقیقاً آینه‌ای از تنظیمات این صفحه باشد** و هر تغییری بلافاصله پس از Refresh در Frontend منعکس شود.