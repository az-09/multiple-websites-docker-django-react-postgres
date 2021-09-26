from django.urls import path
from .views import QuickPickMegaMillionsList, QuickPickPowerballList
urlpatterns = [
    path('megamillions/', QuickPickMegaMillionsList.as_view()),
    path('powerball/', QuickPickPowerballList.as_view()),
]
