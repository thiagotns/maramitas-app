from django.db import models

# Create your models here.

class Menu(models.Model):

    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return "Menu from " + str(self.start_date) + " to " + str(self.end_date)