from django.contrib import admin
from .models import Menu

# Register your models here.
class MenuAdmin(admin.ModelAdmin):
    list_display = ('id', 'start_date', 'end_date')

admin.site.register(Menu, MenuAdmin)