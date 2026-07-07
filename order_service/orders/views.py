from decimal import Decimal

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from .serializers import OrderSerializer


class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        items = request.data.get('items', [])
        order_data = {
            'user_id': request.data.get('user_id'),
            'shipping_address': request.data.get('shipping_address', ''),
        }
        serializer = OrderSerializer(data=order_data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        order = serializer.save()
        total_amount = Decimal('0.00')
        for item in items:
            OrderItem.objects.create(
                order=order,
                product_id=item['product_id'],
                product_name=item['product_name'],
                quantity=item['quantity'],
                unit_price=item['unit_price'],
            )
            total_amount += Decimal(str(item['unit_price'])) * item['quantity']

        order.total_amount = total_amount
        order.save(update_fields=['total_amount'])
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, order_id):
        order = Order.objects.filter(id=order_id).prefetch_related('items').first()
        if not order:
            return Response({'detail': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(OrderSerializer(order).data)


class OrderListView(APIView):
    def get(self, request, user_id):
        orders = Order.objects.filter(user_id=user_id).prefetch_related('items').order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class OrderStatusUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, order_id):
        order = Order.objects.filter(id=order_id).first()
        if not order:
            return Response({'detail': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        status_value = request.data.get('status')
        if status_value not in dict(Order.STATUS_CHOICES):
            return Response({'detail': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

        order.status = status_value
        order.save(update_fields=['status'])
        return Response(OrderSerializer(order).data)
