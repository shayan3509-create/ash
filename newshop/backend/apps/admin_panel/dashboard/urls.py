from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("", views.dashboard, name="dashboard"),
    path("users/", views.users, name="users"),
    path("users/create/", views.users_create, name="users_create"),
    path("users/roles/", views.users_roles, name="users_roles"),
    path("products/", views.products, name="products"),
    path("products/create/", views.products_create, name="products_create"),
    path("orders/", views.orders_history, name="orders"),
    path("orders/new/", views.orders_new, name="orders_new"),
    path("orders/reports/", views.orders_reports, name="orders_reports"),
    path("finance/revenue/", views.finance_revenue, name="finance_revenue"),
    path("finance/invoices/", views.finance_invoices, name="finance_invoices"),
    path("finance/transactions/", views.finance_transactions, name="finance_transactions"),
    path("settings/", views.settings_general, name="settings"),
    path("settings/config/", views.settings_config, name="settings_config"),
    path("settings/backup/", views.settings_backup, name="settings_backup"),
    path("analytics/", views.analytics, name="analytics"),
]