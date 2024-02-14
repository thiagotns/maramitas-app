from django.contrib import admin
from .models import Menu, Option, MenuItem

# Register your models here.
class MenuAdmin(admin.ModelAdmin):
    list_display = ('id', 'start_date', 'end_date')

class OptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price')

class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'type', 'menu')


admin.site.register(Menu, MenuAdmin)
admin.site.register(Option, OptionAdmin)
admin.site.register(MenuItem, MenuItemAdmin)