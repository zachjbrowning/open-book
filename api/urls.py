
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path('', include('core.urls')),
    url(r'^(?:.*)/?$', index),
]
