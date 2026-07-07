from uuid import uuid4

from rest_framework.test import APITestCase


class PaymentApiTests(APITestCase):
    def test_can_create_and_confirm_payment(self):
        response = self.client.post(
            '/payments/',
            {
                'order_id': str(uuid4()),
                'amount': '149.99',
                'currency': 'USD',
                'provider': 'stripe',
            },
            format='json',
        )
        self.assertEqual(response.status_code, 201)

        confirm_response = self.client.post(
            f"/payments/{response.data['id']}/confirm/",
            {'transaction_reference': 'txn_123'},
            format='json',
        )
        self.assertEqual(confirm_response.status_code, 200)
        self.assertEqual(confirm_response.data['status'], 'succeeded')
