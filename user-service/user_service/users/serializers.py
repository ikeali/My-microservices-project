from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"



class InternalUserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["auth_user_id", "email", "role", "first_name", "last_name"]