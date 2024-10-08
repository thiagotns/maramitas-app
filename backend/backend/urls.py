"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from api.views import MenuViewSet
from api.views import MenuItemViewSet
from api.views import OptionViewSet
from api.views import TokenObtainPairView
from api.views import AreaViewSet
from api.views import CustomerViewSet
from api.views import PaymentMethodViewSet
from api.views import OrderViewSet
from api.views import publicMenuView
from rest_framework_simplejwt.views import TokenRefreshView

router =  routers.DefaultRouter()
router.register(r'menu', MenuViewSet)
router.register(r'menu-item', MenuItemViewSet)
router.register(r'option', OptionViewSet)
router.register(r'area', AreaViewSet)
router.register(r'customer', CustomerViewSet)
router.register(r'payment-method', PaymentMethodViewSet)
router.register(r'order', OrderViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('public/menu/', publicMenuView, name='public_menu'),
]