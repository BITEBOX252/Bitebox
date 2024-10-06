
from django.urls import path, include
from .views import NearbyRestaurants,RestaurantCreateView
urlpatterns = [

    path('nearby-restaurants/', NearbyRestaurants.as_view(), name='nearby_restaurants'),
    path('register/', RestaurantCreateView.as_view(), name='nearby_restaurants'),
]