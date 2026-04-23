from rest_framework import generics,permissions
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
from .serializers import UserProfileSerializer
from .serializers import InternalUserCreateSerializer
from .permissions import IsAdminRole


class UserListView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, IsAdminRole]



class InternalUserCreateView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = InternalUserCreateSerializer
    permission_classes = [permissions.AllowAny]  # tighten this later