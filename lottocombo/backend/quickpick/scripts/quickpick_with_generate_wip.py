import random
from threading import Thread

from django.db import models

from lottery.models import WinningNumbersCombination
from quickpick.models import QuickPickMegaMillions, QuickPickPowerball

game_info = {
    'megamillions': {
        'model': QuickPickMegaMillions,
    },
    'powerball': {
        'model': QuickPickPowerball
    },
}


def delete_quick_picks() -> None:
    QuickPickMegaMillions.objects.all().delete()
    QuickPickPowerball.objects.all().delete()


def get_top_occurrences(game: str) -> list:
    top_occurrences = []
    objects = WinningNumbersCombination.objects.filter(
        game=game, top_occurrence=True)

    for object in objects.iterator():
        # [['14', '50'], ['12', '20'] ...]
        top_occurrences.append(
            list(object.winning_numbers_combination.split(', ')))

    return top_occurrences

def generate_quick_pick(top_occurrences: list) -> list:
    quick_pick = []
    random_picks = []

    while len(quick_pick) < 6:
        random_picks.extend(random.choice(top_occurrences))
        quick_pick = sorted(set(random_picks))[:6]
    
    return quick_pick


def load_quick_picks(model: models, top_occurrences: list) -> None:
    quick_picks = []

    while len(quick_picks) < 25:
        quick_pick = generate_quick_pick(top_occurrences)
        quick_picks.append(quick_pick)

    load_data = [model(quick_pick=', '.join(quick_pick))
                 for quick_pick in quick_picks]
    print(load_data)
    # model.objects.bulk_create(load_data)


def run() -> None:

    games = ['megamillions', 'powerball']
    # Thread(delete_quick_picks()).start()
    for game in games:
        top_occurrences = get_top_occurrences(game)
        Thread(load_quick_picks(
            game_info[game]['model'], top_occurrences)).start()
