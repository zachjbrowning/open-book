from django.urls import include, path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'collection', CollectionViewSet)
router.register(r'note', NoteViewSet)
router.register(r'keyword', KeywordViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('user/login/', CustomObtainAuthToken.as_view()),
    path('user/register/', UserCreate.as_view()),
    path('user/logout/', UserLogout.as_view()),
    path('', include(router.urls)),
    path('api-token-auth/', include('rest_framework.urls', namespace='api-token-auth'))
]