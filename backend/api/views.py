from django.shortcuts import render
from rest_framework import viewsets
from .models import Menu, Option, MenuItem
from .serializers import MenuSerializer, OptionSerializer, MenuItemSerializer, MenuItemReadSerializer

class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    
    def get_serializer_class(self):
         # Define your HTTP method-to-serializer mapping freely.
         # This also works with CoreAPI and Swagger documentation,
         # which produces clean and readable API documentation,
         # so I have chosen to believe this is the way the
         # Django REST Framework author intended things to work:
         if self.request.method in ['GET']:
             # Since the ReadSerializer does nested lookups
             # in multiple tables, only use it when necessary
             return MenuItemReadSerializer
         return MenuItemSerializer