from django.urls import include, path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'api/user', UserViewSet)
router.register(r'api/collection', CollectionViewSet)
router.register(r'api/note', NoteViewSet)
router.register(r'api/keyword', KeywordViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/user/login/', CustomObtainAuthToken.as_view()),
    path('api/user/register/', UserCreate.as_view()),
    path('api/user/logout/', UserLogout.as_view()),
    path('api/api-token-auth/', include('rest_framework.urls', namespace='api-token-auth')),
    path('', include(router.urls)),
]