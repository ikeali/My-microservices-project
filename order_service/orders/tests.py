from uuid import uuid4

from rest_framework.test import APITestCase


class OrderApiTests(APITestCase):
    def test_can_create_order(self):
        user_id = uuid4()
        response = self.client.post(
            '/orders/',
            {
                'user_id': str(user_id),
                'shipping_address': '123 Main St',
                'items': [
                    {
                        'product_id': str(uuid4()),
                        'product_name': 'Keyboard',
                        'quantity': 2,
                        'unit_price': '49.99',
                    }
                ],
            },
            format='json',
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['status'], 'pending')
