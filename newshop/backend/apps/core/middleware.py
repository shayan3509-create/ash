from django.shortcuts import render


class Custom404Middleware:
    """
    نمایش صفحه ۴۰۴ سفارشی حتی در حالت DEBUG=True
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # اگر پاسخ ۴۰۴ بود و درخواست مربوط به static/media نبود
        if response.status_code == 404:
            path = request.path

            # فایل‌های static و media را دستکاری نکن
            if path.startswith("/static/") or path.startswith("/media/"):
                return response

            # فقط برای درخواست‌های HTML صفحه سفارشی نشان بده
            accept = request.headers.get("Accept", "text/html")
            if "text/html" in accept:
                return render(request, "404.html", status=404)

        return response