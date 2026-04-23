from django.urls import path
from .views import UserListView, InternalUserCreateView

urlpatterns = [
    path("", UserListView.as_view(), name="user-list"),
    path("internal/users/", InternalUserCreateView.as_view(), name="internal-user-create"),
]