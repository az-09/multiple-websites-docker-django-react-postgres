from .serializers import (QuickPickMegaMillionsSerializer,
                                           QuickPickPowerballSerializer)
from rest_framework.generics import ListAPIView

from .models import QuickPickMegaMillions, QuickPickPowerball

# Create your views here.


class QuickPickMegaMillionsList(ListAPIView):
    queryset = QuickPickMegaMillions.objects.all().order_by('-created_at')
    serializer_class = QuickPickMegaMillionsSerializer


class QuickPickPowerballList(ListAPIView):
    queryset = QuickPickPowerball.objects.all().order_by('-created_at')
    serializer_class = QuickPickPowerballSerializer
