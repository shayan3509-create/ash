from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect


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


@login_required
def dashboard(request):
    return render(request, "admin_panel/dashboard.html")


@login_required
def users(request):
    return render(request, "admin_panel/users/index.html")


@login_required
def users_create(request):
    return render(request, "admin_panel/users/create.html")


@login_required
def users_roles(request):
    return render(request, "admin_panel/users/roles.html")


@login_required
def products(request):
    return render(request, "admin_panel/products/index.html")


@login_required
def products_create(request):
    return render(request, "admin_panel/products/create.html")


@login_required
def orders_history(request):
    return render(request, "admin_panel/orders/history.html")


@login_required
def orders_new(request):
    return render(request, "admin_panel/orders/new.html")


@login_required
def orders_reports(request):
    return render(request, "admin_panel/orders/reports.html")


@login_required
def finance_revenue(request):
    return render(request, "admin_panel/finance/revenue.html")


@login_required
def finance_invoices(request):
    return render(request, "admin_panel/finance/invoices.html")


@login_required
def finance_transactions(request):
    return render(request, "admin_panel/finance/transactions.html")


@login_required
def settings_general(request):
    return render(request, "admin_panel/settings/general.html")


@login_required
def settings_config(request):
    return render(request, "admin_panel/settings/config.html")


@login_required
def settings_backup(request):
    return render(request, "admin_panel/settings/backup.html")


@login_required
def analytics(request):
    return render(request, "admin_panel/analytics.html")

@login_required
def homepage_sections(request):
    """مدیریت بخش‌های صفحه اصلی"""
    return render(request, "admin_panel/homepage.html")