from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Payment
from .serializers import PaymentSerializer


class PaymentCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            payment = serializer.save()
            return Response(PaymentSerializer(payment).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PaymentDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, payment_id):
        payment = Payment.objects.filter(id=payment_id).first()
        if not payment:
            return Response({'detail': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(PaymentSerializer(payment).data)


class PaymentConfirmView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, payment_id):
        payment = Payment.objects.filter(id=payment_id).first()
        if not payment:
            return Response({'detail': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)

        payment.status = 'succeeded'
        payment.transaction_reference = request.data.get('transaction_reference', 'manual-confirm')
        payment.save(update_fields=['status', 'transaction_reference'])
        return Response(PaymentSerializer(payment).data)


class PaymentWebhookView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        payment_id = request.data.get('payment_id')
        payment = Payment.objects.filter(id=payment_id).first()
        if not payment:
            return Response({'detail': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)

        payment.status = request.data.get('status', payment.status)
        payment.save(update_fields=['status'])
        return Response(PaymentSerializer(payment).data)
