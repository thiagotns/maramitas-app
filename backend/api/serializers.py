from rest_framework import serializers
from .models import Menu, Option, MenuItem

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'name', 'price')

class MenuItemSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = MenuItem
        fields = ('id', 'name', 'description', 'type', 'menu', 'options')

class MenuSerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True)

    class Meta:
        model = Menu
        fields = ('id', 'start_date', 'end_date', 'items')