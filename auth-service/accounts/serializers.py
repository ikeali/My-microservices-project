# from django.contrib.auth import get_user_model
# from rest_framework import serializers

# User = get_user_model()


# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, min_length=6)

#     class Meta:
#         model = User
#         fields = ["id", "username", "email", "password"]

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data["username"],
#             email=validated_data.get("email", ""),
#             password=validated_data["password"],
#         )
#         return user



import requests
from django.conf import settings
from rest_framework import serializers
from .models import AuthUser
from decouple import config


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = AuthUser
        fields = ["id", "email", "password", "role"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = AuthUser.objects.create_user(password=password, **validated_data)

        user_service_url = config("USER_SERVICE_URL").rstrip("/")

        try:
            response = requests.post(
                f"{user_service_url}/internal/users/",
                json={
                    "auth_user_id": str(user.id),
                    "email": user.email,
                    "role": user.role,
                },
                timeout=5,
            )
            response.raise_for_status()
        except requests.RequestException as e:
            print(f"Failed to sync user to User Service: {e}")

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ["id", "email", "role", "is_active", "is_verified", "date_joined"]