from django.shortcuts import render, get_object_or_404
from apps.admin_panel.products.models import Product


def product_detail(request, slug):
    """صفحه جزئیات محصول"""
    
    # گرفتن محصول بر اساس slug
    product = get_object_or_404(
        Product, 
        slug=slug, 
        status='active',
        show_on_site=True
    )
    
    # محصولات مرتبط (از همان دسته‌بندی)
    related_products = Product.objects.filter(
        category=product.category,
        status='active',
        show_on_site=True
    ).exclude(id=product.id)[:4]
    
    context = {
        'product': product,
        'related_products': related_products,
    }
    
    return render(request, 'products/detail.html', context)