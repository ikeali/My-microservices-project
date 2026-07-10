from django.test import SimpleTestCase
from django.urls import resolve


class GatewayProxyRouteTests(SimpleTestCase):
    def test_products_route_uses_products_service(self):
        match = resolve("/api/products/health/")
        self.assertEqual(match.func.view_initkwargs["service"], "products")

    def test_orders_route_uses_orders_service(self):
        match = resolve("/api/orders/health/")
        self.assertEqual(match.func.view_initkwargs["service"], "orders")
