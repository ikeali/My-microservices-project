from django.urls import path

from .views import ProxyView

urlpatterns = [
    path("auth/<path:path>", ProxyView.as_view(service="auth")),
    path("products/<path:path>", ProxyView.as_view(service="products")),
    path("carts/<path:path>", ProxyView.as_view(service="carts")),
    path("orders/<path:path>", ProxyView.as_view(service="orders")),
    path("payments/<path:path>", ProxyView.as_view(service="payments")),
    path("notifications/<path:path>", ProxyView.as_view(service="notifications")),
]