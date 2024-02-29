from django.contrib import admin
from .models import Menu, Option, MenuItem, Area, Customer, PaymentMethod, Order

# Register your models here.
class MenuAdmin(admin.ModelAdmin):
    list_display = ('id', 'start_date', 'end_date')

class OptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price')

class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'type', 'menu')

class AreaAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'delivery_fee')

class CustomerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone', 'address', 'area')

class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'payment_method', 'total', 'status')

admin.site.register(Menu, MenuAdmin)
admin.site.register(Option, OptionAdmin)
admin.site.register(MenuItem, MenuItemAdmin)
admin.site.register(Area, AreaAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(PaymentMethod, PaymentMethodAdmin)
admin.site.register(Order, OrderAdmin)
