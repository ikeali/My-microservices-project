from uuid import uuid4

from rest_framework.test import APITestCase


class CartApiTests(APITestCase):
    def test_can_create_cart_and_item(self):
        user_id = uuid4()
        response = self.client.post(
            '/carts/',
            {'user_id': str(user_id)},
            format='json',
        )
        self.assertEqual(response.status_code, 201)

        item_response = self.client.post(
            f'/carts/{user_id}/items/',
            {
                'product_id': str(uuid4()),
                'product_name': 'Laptop',
                'quantity': 1,
                'unit_price': '999.99',
            },
            format='json',
        )
        self.assertEqual(item_response.status_code, 201)
