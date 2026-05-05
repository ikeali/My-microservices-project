# urls.py

from rest_framework.routers import DefaultRouter
from products.views import ProductViewSet

router = DefaultRouter()
# router.register(r'products', ProductViewSet)
router.register(r'', ProductViewSet)

urlpatterns = router.urls