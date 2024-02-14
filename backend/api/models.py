from django.db import models

# Create your models here.

class Menu(models.Model):

    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return "Menu from " + str(self.start_date) + " to " + str(self.end_date)


class Option(models.Model):

    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.name

class MenuItem(models.Model):

    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    type = models.CharField(max_length=20)

    menu = models.ForeignKey(Menu, on_delete=models.PROTECT)
    options = models.ManyToManyField(Option)

    def __str__(self):
        return self.name
