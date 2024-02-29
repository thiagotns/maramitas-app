from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Menu, Option, MenuItem, Area, Customer, PaymentMethod, Order
from .serializers import MenuSerializer, OptionSerializer, MenuItemSerializer, MenuItemReadSerializer, TokenObtainPairSerializer, AreaSerializer, CustomerSerializer, CustomerReadSerializer, PaymentMethodSerializer, OrderSerializer
from django.http import HttpResponse
from backend.settings import BASE_DIR
import imgkit
import hashlib
import os

class MenuViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class OptionViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

class MenuItemViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
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
    
class AreaViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Customer.objects.all()
    
    def get_serializer_class(self):
         if self.request.method in ['GET']:
             return CustomerReadSerializer
         return CustomerSerializer

class TokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


def publicMenuView(request):

    file_path = os.path.join(BASE_DIR, 'api/templates/menu-template.html')
    html_content = open(file_path, "r")

    id = request.GET.get('id')
    type = request.GET.get('type')

    if id:
        menu = Menu.objects.get(id=id)

        items = menu.items

        tradicional_html = ""
        premium_html = ""

        for item in items.all():

            if item.type == "Tradicional":
                tradicional_html += f"<li><h3>{item.name}</h3><p>{item.description}</p></li>\n"

            if item.type == "Premium":
                price = f"R$ {item.options.get().price:.2f}"
                premium_html += f"<li><h3>{item.name} - {price}</h3><p>{item.description}</p></li>\n"

        html_content = html_content.read().replace("[itens_tradicional]", tradicional_html).replace("[itens_premium]", premium_html).replace("[end_date]", menu.end_date.strftime("%d/%m/%Y"))

        if type == "html":
            return HttpResponse(html_content)

        hash = hashlib.md5(html_content.encode()).hexdigest()

        menu_file_name = f"{hash}.jpg"
        menu_file_path = os.path.join(BASE_DIR, f"api/menu-files/{menu_file_name}")

        if not os.path.exists(menu_file_path):

            img_options  = {
                'format': 'jpg',
                'crop-x': '128',
                'crop-w': '768'
            }

            imgkit.from_string(html_content, menu_file_path, options=img_options)
    
        img = open(menu_file_path, "rb")
        
        response = HttpResponse(img, content_type="image/jpg")
        response['Content-Disposition'] = 'inline; filename="cardapio-mara.jpg"'
        return response
    
class PaymentMethodViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Order.objects.all()
    serializer_class = OrderSerializer