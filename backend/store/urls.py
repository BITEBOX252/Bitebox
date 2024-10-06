from django.urls import path
from .views import CategoryListAPIView,DishListAPIView,DishDetailAPIView
urlpatterns = [
    path('categories/',CategoryListAPIView.as_view()),
    path('dishes/',DishListAPIView.as_view()),
    path('dish/<slug>',DishDetailAPIView.as_view()),
]