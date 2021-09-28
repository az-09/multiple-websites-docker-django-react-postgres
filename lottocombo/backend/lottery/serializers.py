from rest_framework.serializers import ModelSerializer
from .models import MegaMillions, Powerball, WinningNumbersCombination


class MegaMillionsSerializer(ModelSerializer):
    class Meta:
        model = MegaMillions
        exclude = ('id',)

class PowerballSerializer(ModelSerializer):
    class Meta:
        model = Powerball
        exclude = ('id',)

class WinningNumbersCombinationSerializer(ModelSerializer):
    class Meta:
        model = WinningNumbersCombination
        exclude = ('id',)
