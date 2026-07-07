from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Cart
from .serializers import CartItemSerializer, CartSerializer


class CartDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, user_id):
        cart, _ = Cart.objects.get_or_create(user_id=user_id)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            cart = serializer.save()
            return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartItemCreateView(APIView):
    permission_classes = [IsAuthenticated]  
    def post(self, request, user_id):
        cart, _ = Cart.objects.get_or_create(user_id=user_id)
        item_data = request.data.copy()
        serializer = CartItemSerializer(data=item_data)
        if serializer.is_valid():
            serializer.save(cart=cart)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartItemDeleteView(APIView):
    permission_classes = [IsAuthenticated]  
    def delete(self, request, user_id, item_id):
        cart = Cart.objects.filter(user_id=user_id).first()
        if not cart:
            return Response({'detail': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)

        item = cart.items.filter(id=item_id).first()
        if not item:
            return Response({'detail': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
