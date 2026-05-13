# urls.py

from rest_framework.routers import DefaultRouter
from .views import ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
# router.register(r'', ProductViewSet)

urlpatterns = router.urls


# urlpatterns = [
#     path("create_product/", ProductView.as_view(), name="create_product")
# ]