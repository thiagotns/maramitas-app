from django.db import models

# Create your models here.

class Option(models.Model):

    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.name


class Menu(models.Model):

    start_date = models.DateField()
    end_date = models.DateField()

    avaliable_options = Option.objects.all()

    def __str__(self):
        return "Menu from " + str(self.start_date) + " to " + str(self.end_date)

class MenuItem(models.Model):

    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    type = models.CharField(max_length=20)

    menu = models.ForeignKey(Menu, on_delete=models.PROTECT, related_name='items')
    options = models.ManyToManyField(Option)

    def __str__(self):
        return self.name

    def options_name(self):
        return ", ".join([p.name for p in self.options.all()])
    
class Area(models.Model):
    
    name = models.CharField(max_length=100)
    delivery_fee = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.name

class Customer(models.Model):

    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=11)
    address = models.CharField(max_length=300, null=True, blank=True)
    
    area = models.ForeignKey(Area, on_delete=models.PROTECT, null=True, blank=True)

    def __str__(self):
        return self.name
    
class PaymentMethod(models.Model):
    
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Order(models.Model):

    class Status(models.TextChoices):
        PENDING = 'Pending'
        CONFIRMED = 'Confirmed'
        FULLFILLED = 'Fullfilled'
        SHIPPED = 'Shipped'
        FINISHED = 'Finished'
        CANCELLED = 'Cancelled'

    class ShippingMethod(models.TextChoices):
        PICKUP = 'Pickup'
        DELIVERY = 'Delivery'

    class ShippingTimeRange(models.TextChoices):
        MORNING = 'Morning (9:00-12:00)'
        AFTERNOON = 'Afternoon (14:00-17:00)'

    class PaymentStatus(models.TextChoices):
        PENDING = 'Pending'
        PAID = 'Paid'
        REFUNDED = 'Refunded'

    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name='orders')
    menu = models.ForeignKey(Menu, on_delete=models.PROTECT, related_name='orders')

    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.PROTECT)
    
    shipping_method = models.CharField(max_length=20, choices=ShippingMethod.choices)

    shipping_date = models.DateField()
    shipping_time_range = models.CharField(max_length=30, choices=ShippingTimeRange.choices)
    
    discount = models.DecimalField(max_digits=6, decimal_places=2)
    total_price = models.DecimalField(max_digits=6, decimal_places=2)
    
    payment_status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)

    def __str__(self):
        return "Order from " + self.customer.name + " at " + str(self.shipping_date) + " " + self.shipping_time_range