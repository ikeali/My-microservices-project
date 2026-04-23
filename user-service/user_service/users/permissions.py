from rest_framework.permissions import BasePermission


class IsAdminRole(BasePermission):
    def has_permission(self, request, view):
        token = request.auth
        if not token:
            return False
        return token.get("role") == "admin"