from django.urls import path
from .views import OrderCreateView, OrderDetailView, OrderListView, OrderStatusUpdateView

urlpatterns = [
    path('orders/', OrderCreateView.as_view(), name='order-create'),
    path('orders/<uuid:order_id>/', OrderDetailView.as_view(), name='order-detail'),
    path('orders/user/<uuid:user_id>/', OrderListView.as_view(), name='order-list'),
    path('orders/<uuid:order_id>/status/', OrderStatusUpdateView.as_view(), name='order-status-update'),
]
