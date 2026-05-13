# from rest_framework.viewsets import ModelViewSet
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

# class ProductViewSet(ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     permission_classes = [IsAuthenticated]


class ProductView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]