from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'order_id', 'amount', 'currency', 'provider', 'status', 'transaction_reference', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
