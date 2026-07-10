from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q
from .models import User

def users_list(request):
    # همه کاربران
    all_users = User.objects.all()
    
    # فیلترها
    search = request.GET.get('search', '')
    role = request.GET.get('role', '')
    status = request.GET.get('status', '')
    
    # اعمال فیلترها
    filtered = all_users
    if search:
        filtered = filtered.filter(
            Q(name__icontains=search) | 
            Q(email__icontains=search) | 
            Q(phone__icontains=search)
        )
    if role:
        filtered = filtered.filter(role=role)
    if status:
        filtered = filtered.filter(status=status)
    
    # آمار
    stats = {
        'total': all_users.count(),
        'active': all_users.filter(status='active').count(),
        'inactive': all_users.filter(status='inactive').count(),
        'banned': all_users.filter(status='banned').count(),
    }
    
    context = {
        'users': filtered,
        'search': search,
        'role': role,
        'status': status,
        'stats': stats,
    }
    return render(request, 'admin/users/list.html', context)

def create_user(request):
    if request.method == 'POST':
        User.objects.create(
            name=request.POST['name'],
            email=request.POST['email'],
            phone=request.POST['phone'],
            role=request.POST['role'],
            password=request.POST['password']
        )
    return redirect('users_list')

def update_user(request, id):
    user = get_object_or_404(User, id=id)
    if request.method == 'POST':
        user.name = request.POST['name']
        user.email = request.POST['email']
        user.phone = request.POST['phone']
        user.role = request.POST['role']
        user.save()
    return redirect('users_list')

def delete_user(request, id):
    user = get_object_or_404(User, id=id)
    if request.method == 'POST':
        user.delete()
    return redirect('users_list')

def change_status(request, id):
    user = get_object_or_404(User, id=id)
    if request.method == 'POST':
        user.status = request.POST['status']
        user.save()
    return redirect('users_list')