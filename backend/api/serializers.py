from rest_framework import serializers
from .models import Menu, Option, MenuItem, Area, Customer, PaymentMethod, Order
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'name', 'price')

class MenuItemReadSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = MenuItem
        fields = ('id', 'name', 'description', 'type', 'menu', 'options', 'options_name')

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ('id', 'name', 'description', 'type', 'menu', 'options')


class MenuSerializer(serializers.ModelSerializer):
    items = MenuItemReadSerializer(many=True, read_only=True)
    avaliable_options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = ('id', 'start_date', 'end_date', 'items', 'avaliable_options')

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ('id', 'name', 'delivery_fee')

class CustomerReadSerializer(serializers.ModelSerializer):

    area = AreaSerializer(read_only=True)
    
    class Meta:
        model = Customer
        fields = ('id', 'name', 'phone', 'address', 'area')

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'name', 'phone', 'address', 'area')

class TokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
            data = super().validate(attrs)
    
            user = self.user
            data["user_id"] = user.id
            data["username"] = user.username
    
            return data
    
class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ('id', 'name')

class OrderSerializer(serializers.Serializer):
    class Meta:
        model = Order
        fields = ('id', 'menu', 'customer', 'payment_method', 'total', 'status', 'created_at', 'updated_at')