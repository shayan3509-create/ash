from django.shortcuts import render


def dashboard(request):
    return render(
        request,
        "admin_panel/dashboard.html"
    )


# USERS

def users(request):
    return render(
        request,
        "admin_panel/users/index.html"
    )


def users_create(request):
    return render(
        request,
        "admin_panel/users/create.html"
    )


def users_roles(request):
    return render(
        request,
        "admin_panel/users/roles.html"
    )


# PRODUCTS

def products(request):
    return render(
        request,
        "admin_panel/products/index.html"
    )


def products_create(request):
    return render(
        request,
        "admin_panel/products/create.html"
    )


def products_categories(request):
    return render(
        request,
        "admin_panel/products/categories.html"
    )


# ORDERS

def orders_history(request):
    return render(
        request,
        "admin_panel/orders/history.html"
    )


def orders_new(request):
    return render(
        request,
        "admin_panel/orders/new.html"
    )


def orders_reports(request):
    return render(
        request,
        "admin_panel/orders/reports.html"
    )


# FINANCE

def finance_revenue(request):
    return render(
        request,
        "admin_panel/finance/revenue.html"
    )


def finance_invoices(request):
    return render(
        request,
        "admin_panel/finance/invoices.html"
    )


def finance_transactions(request):
    return render(
        request,
        "admin_panel/finance/transactions.html"
    )


# SETTINGS

def settings_general(request):
    return render(
        request,
        "admin_panel/settings/general.html"
    )


def settings_config(request):
    return render(
        request,
        "admin_panel/settings/config.html"
    )


def settings_backup(request):
    return render(
        request,
        "admin_panel/settings/backup.html"
    )


# ANALYTICS

def analytics(request):
    return render(
        request,
        "admin_panel/analytics.html"
    )

def banners(request):
    return render(
        request,
        "admin_panel/banners.html"
    )