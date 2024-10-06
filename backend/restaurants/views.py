from django.forms import ValidationError
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import generics,status
from .models import Restaurant
from .serializers import RestaurantCreateSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from math import radians, sin, cos, sqrt, atan2
from account.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import TokenAuthentication 


class RestaurantCreateView(generics.CreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantCreateSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        payload = request.data

        user_id = payload.get('user_id')

        # Check if the user already has an associated restaurant
        if Restaurant.objects.filter(user_id=user_id).exists():
            return Response({"message": "User has already associated a restaurant with this account."}, status=status.HTTP_400_BAD_REQUEST)

        image = payload.get('image')
        name = payload.get('name')
        email = payload.get('email')
        description = payload.get('description')
        mobile = payload.get('mobile')
        latitude = payload.get('latitude')
        longitude = payload.get('longitude')

        # Create the restaurant
        Restaurant.objects.create(
            image=image,
            name=name,
            email=email,
            description=description,
            phone_number=mobile,
            user_id=user_id,
            latitude=latitude,
            longitude=longitude
        )

        return Response({"message": "Created vendor account"}, status=status.HTTP_201_CREATED)


   

class NearbyRestaurants(APIView):

    def haversine_distance(self, lat1, lon1, lat2, lon2):
        # Radius of the Earth in kilometers
        R = 6371.0  # Radius of the Earth in kilometers
        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        # print(lat1, lon1, lat2, lon2)
        a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        distance = R * c
        print ("Distance:-----------",distance)
        return distance

    def get(self, request):
        # Get user's current location from the database (assuming user's location is saved during registration)
        user = request.user
        print("User",user)
        # user=User.objects.get(email="wetucecoh@mailinator.com")
        user_latitude = user.latitude
        user_longitude=user.longitude  # Replace with your user model fields
        print("user_latitude",user_latitude)
        print("user_longitude",user_longitude)
        nearby_restaurants = []
        radius_km = 5  # Define the search radius in kilometers

        # Get all restaurants from the database
        restaurants = Restaurant.objects.all()
        print(restaurants)
        # Loop through all restaurants and calculate the distance using Haversine formula
        for restaurant in restaurants:
            restaurant_location = (restaurant.latitude, restaurant.longitude)
            print(restaurant_location)
            distance = self.haversine_distance(user_latitude, user_longitude, restaurant.latitude, restaurant.longitude)

            # Check if the restaurant is within the 5 km radius
            if distance <= radius_km:
                nearby_restaurants.append(restaurant)
        print(nearby_restaurants)
        # Serialize the filtered restaurants
        serializer = RestaurantCreateSerializer(nearby_restaurants, many=True)
        return Response(serializer.data)

