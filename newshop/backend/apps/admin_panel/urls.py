from django.urls import path
from . import views

app_name = "admin_panel"



urlpatterns = [

    # dashboard
    path(
        "",
        views.dashboard,
        name="dashboard"
    ),


    # users
    path(
        "users/",
        views.users,
        name="users"
    ),

    path(
        "users/create/",
        views.users_create,
        name="users_create"
    ),

    path(
        "users/roles/",
        views.users_roles,
        name="users_roles"
    ),



    # products
    path(
        "products/",
        views.products,
        name="products"
    ),

    path(
        "products/create/",
        views.products_create,
        name="products_create"
    ),

    path(
        "products/categories/",
        views.products_categories,
        name="products_categories"
    ),



    # orders
    path(
        "orders/",
        views.orders_history,
        name="orders"
    ),

    path(
        "orders/new/",
        views.orders_new,
        name="orders_new"
    ),

    path(
        "orders/reports/",
        views.orders_reports,
        name="orders_reports"
    ),



    # finance
    path(
        "finance/revenue/",
        views.finance_revenue,
        name="finance_revenue"
    ),

    path(
        "finance/invoices/",
        views.finance_invoices,
        name="finance_invoices"
    ),

    path(
        "finance/transactions/",
        views.finance_transactions,
        name="finance_transactions"
    ),



    # settings
    path(
        "settings/",
        views.settings_general,
        name="settings"
    ),

    path(
        "settings/config/",
        views.settings_config,
        name="settings_config"
    ),

    path(
        "settings/backup/",
        views.settings_backup,
        name="settings_backup"
    ),



    # analytics
    path(
        "analytics/",
        views.analytics,
        name="analytics"
    ),
    
    path(
            "banners/",
            views.banners,
            name="banners"
        ),

]