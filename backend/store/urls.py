from django.urls import path
from .views import CategoryListAPIView,DishListAPIView
urlpatterns = [
    path('categories/',CategoryListAPIView.as_view()),
    path('dishes/',DishListAPIView.as_view())
]