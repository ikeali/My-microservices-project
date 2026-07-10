from django.conf import settings

SERVICES = {
    "auth": settings.AUTH_SERVICE,
    "products": settings.PRODUCT_SERVICE,
    "carts": settings.CART_SERVICE,
    "orders": settings.ORDER_SERVICE,
    "payments": settings.PAYMENT_SERVICE,
}