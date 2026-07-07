# from django.urls import path
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,

# )
# from .views import LogoutView, RegisterView, MeView
# urlpatterns = [
#     path('register/', RegisterView.as_view()),
#     path('login/', TokenObtainPairView.as_view()),
#     path('refresh/', TokenRefreshView.as_view()),
#     path('logout/', LogoutView.as_view()),
#     path('me/', MeView.as_view()),

# ]



from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .views import RegisterView, LoginView, MeView, ValidateTokenView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("me/", MeView.as_view(), name="me"),
    path("validate/", ValidateTokenView.as_view(), name="validate"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]