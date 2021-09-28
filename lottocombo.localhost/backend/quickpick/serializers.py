from rest_framework.serializers import ModelSerializer
from .models import QuickPickMegaMillions, QuickPickPowerball


class QuickPickMegaMillionsSerializer(ModelSerializer):
    class Meta:
        model = QuickPickMegaMillions
        exclude = ('id',)

class QuickPickPowerballSerializer(ModelSerializer):
    class Meta:
        model = QuickPickPowerball
        exclude = ('id',)
