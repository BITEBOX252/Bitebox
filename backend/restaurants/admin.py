from django.contrib import admin

# Register your models here.
from .models import Restaurant,DeliveryBoy

admin.site.register(Restaurant)
admin.site.register(DeliveryBoy)