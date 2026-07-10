import requests

from django.http import HttpResponse
from django.views import View

from .services import SERVICES


class ProxyView(View):
    """
    Generic API Gateway proxy.
    """

    service = None

    http_method_names = [
        "get",
        "post",
        "put",
        "patch",
        "delete",
        "options",
        "head",
    ]

    def forward_request(self, request, path):
        # Get the upstream service URL
        base_url = SERVICES.get(self.service)

        if not base_url:
            return HttpResponse(
                f"Unknown service: {self.service}",
                status=502,
            )

        # Build the upstream URL
        url = f"{base_url}/api/{self.service}/{path}"

        headers = {}

        # Forward Authorization header
        if "Authorization" in request.headers:
            headers["Authorization"] = request.headers["Authorization"]

        # Forward Content-Type header
        if "Content-Type" in request.headers:
            headers["Content-Type"] = request.headers["Content-Type"]

        try:
            response = requests.request(
                method=request.method,
                url=url,
                headers=headers,
                params=request.GET,
                data=request.body,
                timeout=30,
            )
        except requests.RequestException as exc:
            return HttpResponse(
                f"Upstream request failed: {exc}",
                status=502,
            )

        excluded_headers = {
            "Content-Encoding",
            "Transfer-Encoding",
            "Connection",
        }

        django_response = HttpResponse(
            response.content,
            status=response.status_code,
        )

        for key, value in response.headers.items():
            if key not in excluded_headers:
                django_response[key] = value

        return django_response

    def get(self, request, path):
        return self.forward_request(request, path)

    def post(self, request, path):
        return self.forward_request(request, path)

    def put(self, request, path):
        return self.forward_request(request, path)

    def patch(self, request, path):
        return self.forward_request(request, path)

    def delete(self, request, path):
        return self.forward_request(request, path)

    def options(self, request, path):
        return self.forward_request(request, path)

    def head(self, request, path):
        return self.forward_request(request, path)