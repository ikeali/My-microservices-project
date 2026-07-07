from django.urls import path
from .views import PaymentConfirmView, PaymentCreateView, PaymentDetailView, PaymentWebhookView

urlpatterns = [
    path('payments/', PaymentCreateView.as_view(), name='payment-create'),
    path('payments/<uuid:payment_id>/', PaymentDetailView.as_view(), name='payment-detail'),
    path('payments/<uuid:payment_id>/confirm/', PaymentConfirmView.as_view(), name='payment-confirm'),
    path('payments/webhook/', PaymentWebhookView.as_view(), name='payment-webhook'),
]
