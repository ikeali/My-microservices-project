from django.urls import path
from .views import CartDetailView, CartItemCreateView, CartItemDeleteView

urlpatterns = [
    path('carts/', CartDetailView.as_view(), name='cart-list-create'),
    path('carts/<uuid:user_id>/', CartDetailView.as_view(), name='cart-detail'),
    path('carts/<uuid:user_id>/items/', CartItemCreateView.as_view(), name='cart-item-create'),
    path('carts/<uuid:user_id>/items/<uuid:item_id>/', CartItemDeleteView.as_view(), name='cart-item-delete'),
]
