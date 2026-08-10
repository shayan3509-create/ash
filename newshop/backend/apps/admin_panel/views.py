import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.utils.dateparse import parse_date
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import Banner


# ================= AUTH =================

def login_view(request):
    if request.user.is_authenticated:
        return redirect("admin_panel:dashboard")

    error = None
    if request.method == "POST":
        username = request.POST.get("username", "").strip()
        password = request.POST.get("password", "")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect(request.GET.get("next") or "admin_panel:dashboard")
        error = "نام کاربری یا رمز عبور اشتباه است."

    return render(request, "admin_panel/login.html", {"error": error})


def logout_view(request):
    logout(request)
    return redirect("admin_panel:login")


# ================= PAGES =================

@login_required
def dashboard(request):
    return render(request, "admin_panel/dashboard.html")


# USERS

@login_required
def users(request):
    return render(request, "admin_panel/users/index.html")


@login_required
def users_create(request):
    return render(request, "admin_panel/users/create.html")


@login_required
def users_roles(request):
    return render(request, "admin_panel/users/roles.html")


# PRODUCTS

@login_required
def products(request):
    return render(request, "admin_panel/products/index.html")


@login_required
def products_create(request):
    return render(request, "admin_panel/products/create.html")


@login_required
def products_categories(request):
    return render(request, "admin_panel/products/categories.html")


# ORDERS

@login_required
def orders_history(request):
    return render(request, "admin_panel/orders/history.html")


@login_required
def orders_new(request):
    return render(request, "admin_panel/orders/new.html")


@login_required
def orders_reports(request):
    return render(request, "admin_panel/orders/reports.html")


# FINANCE

@login_required
def finance_revenue(request):
    return render(request, "admin_panel/finance/revenue.html")


@login_required
def finance_invoices(request):
    return render(request, "admin_panel/finance/invoices.html")


@login_required
def finance_transactions(request):
    return render(request, "admin_panel/finance/transactions.html")


# SETTINGS

@login_required
def settings_general(request):
    return render(request, "admin_panel/settings/general.html")


@login_required
def settings_config(request):
    return render(request, "admin_panel/settings/config.html")


@login_required
def settings_backup(request):
    return render(request, "admin_panel/settings/backup.html")


# ANALYTICS

@login_required
def analytics(request):
    return render(request, "admin_panel/analytics.html")


# ================= BANNERS (API + PAGE) =================
def _banner_post(request):
    action = request.POST.get("action")

    # ---------- ذخیره ترتیب ----------
    if action == "save_order":
        import json
        try:
            order_ids = json.loads(request.POST.get("order", "[]"))
            for position, banner_id in enumerate(order_ids, start=1):
                Banner.objects.filter(id=banner_id).update(order=position)
            return JsonResponse({"success": True})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=400)

    # ---------- حذف ----------
    if action == "delete":
        banner = get_object_or_404(Banner, id=request.POST.get("id"))
        banner.delete()
        return JsonResponse({"success": True})

    # ---------- ایجاد / ویرایش ----------
    banner_id = request.POST.get("id")
    banner = get_object_or_404(Banner, id=banner_id) if banner_id else Banner()

    title = request.POST.get("title", "").strip()
    if not title:
        return JsonResponse({"success": False, "error": "عنوان الزامی است"}, status=400)

    banner_file = request.FILES.get("file")
    mobile_file = request.FILES.get("mobile_file") # <-- دریافت فایل موبایل

    if not banner_id and not banner_file:
        return JsonResponse({"success": False, "error": "انتخاب فایل دسکتاپ الزامی است"}, status=400)

    banner.title = title
    if banner_file:
        banner.file = banner_file
        banner.banner_type = request.POST.get("banner_type", "image")
    if mobile_file:
        banner.mobile_file = mobile_file # <-- ذخیره فایل موبایل

    banner.link = request.POST.get("link", "").strip()
    banner.new_tab = request.POST.get("new_tab") == "true"
    banner.status = request.POST.get("status", "active")

    start = request.POST.get("start_date") or None
    banner.start_date = parse_date(start) if start else None
    end = request.POST.get("end_date") or None
    banner.end_date = parse_date(end) if end else None

    banner.seo_title = request.POST.get("seo_title", "").strip()
    banner.seo_description = request.POST.get("seo_description", "").strip()

    banner.save()
    return JsonResponse({"success": True, "id": banner.id})

@login_required
@ensure_csrf_cookie
def banners(request):
    if request.method == "POST":
        return _banner_post(request)

    banners_data = [b.to_dict() for b in Banner.objects.order_by("order", "-created_at")]
    return render(request, "admin_panel/banners.html", {"banners_data": banners_data})