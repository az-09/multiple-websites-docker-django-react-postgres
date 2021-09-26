import json
import logging
from itertools import combinations
from pathlib import Path
from threading import Thread
from typing import Tuple

import requests
from django.db import models

from .models import MegaMillions, Powerball, WinningNumbersCombination

url = 'https://data.ny.gov/api/views/5xaw-6ayf/rows.json?accessType=DOWNLOAD'

game_info = {
    'megamillions': {
        'url': 'https://data.ny.gov/api/views/5xaw-6ayf/rows.json?accessType=DOWNLOAD',
        'model': MegaMillions,

    },
    'powerball': {
        'url': 'https://data.ny.gov/api/views/d6yy-54nr/rows.json?accessType=DOWNLOAD',
        'model': Powerball
    },
}


def delete_winning_numbers(model: models) -> None:
    # MegaMillions.objects.all().delete()
    # Powerball.objects.all().delete()
    model.objects.all().delete()


def delete_winning_numbers_combinations() -> None:
    WinningNumbersCombination.objects.all().delete()


def winning_numbers_combinations_occurrences(win_nums_combos_list: list) -> dict:
    occurrences = {}
    for combo in win_nums_combos_list:
        try:
            occurrences[combo] += 1
        except:
            occurrences[combo] = 1
    return occurrences


def winning_numbers_combinations(win_nums_list: list) -> Tuple[list, int]:
    win_nums_combos_list = []
    number_of_draws = len(win_nums_list)

    for winning_numbers in win_nums_list:
        for i in range(1, len(winning_numbers)+1):
            for combo in combinations(winning_numbers, i):
                win_nums_combos_list.append(combo)

    return win_nums_combos_list, number_of_draws


def load_winning_numbers(game: str, model: models, win_nums_data: list) -> None:
    # 2013-04-30T00:00:00

    if game == 'megamillions':
        load_data = [model(draw_date=item[8], winning_numbers=item[9],
                           ball=item[10], multiplier=item[-1], number_of_draws=len(win_nums_data)) for item in win_nums_data]
    if game == 'powerball':
        load_data = [model(draw_date=item[8], winning_numbers=item[9][:-2],
                           ball=item[9][-2:], multiplier=item[-1], number_of_draws=len(win_nums_data)) for item in win_nums_data]

    model.objects.bulk_create(load_data)


def load_winning_numbers_combinations(game: str, win_nums_data: list) -> None:
    top_occurrence_numbers_length = 2  # ('01, '10')

    if game == 'megamillions':
        win_nums_list = [  # ('01', '09', '17', '27', '34', '*24') * mega number
            (*item[9].split(' '), f'*{item[10]}') for item in win_nums_data]
    if game == 'powerball':
        win_nums_list = [  # ('01', '09', '17', '27', '34', '*24') * mega number
            (*item[9].split(' ')[:-2], f'*{item[9][-2:]}') for item in win_nums_data]

    win_nums_combos_list, number_of_draws = winning_numbers_combinations(
        win_nums_list)

    win_nums_occurs = winning_numbers_combinations_occurrences(
        win_nums_combos_list)

    # 0.5% of reoccurrence eg) total # draws 2000 -> 10 times occurred
    min_occurrence = number_of_draws * 0.005
    top_occurrence_min_occurrence = number_of_draws * \
        0.008  # 0.8 % of reoccurrence <= top occurrence

    win_nums_occurs_data = [WinningNumbersCombination(
                            game=game,
                            winning_numbers_combination=', '.join(k),
                            winning_numbers_combination_occurrence=v,
                            number_of_draws=number_of_draws,
                            possibility=v/number_of_draws*100,
                            top_occurrence=True if len(
                                k) >= top_occurrence_numbers_length and v >= top_occurrence_min_occurrence else False
                            ) for k, v in win_nums_occurs.items() if v >= min_occurrence]

    WinningNumbersCombination.objects.bulk_create(win_nums_occurs_data)


def get_winning_numbers(url: str) -> list:
    request = requests.get(url)
    data = json.loads(request.content.decode('utf-8'))["data"]
    return data


def run() -> None:
    BASE_DIR = Path(__file__).resolve().parent.parent
    filename = BASE_DIR / 'cron.log'
    logging.basicConfig(filename=filename, filemode='w',
                        format='%(asctime)s %(message)s', level=logging.INFO)
    logging.info('Started')
    logging.info('--> delete_winning_numbers_combinations')
    Thread(delete_winning_numbers_combinations()).start()

    games = ['megamillions', 'powerball']
    for game in games:
        logging.info(f'--> {game} --> delete_winning_numbers')
        Thread(delete_winning_numbers(game_info[game]['model'])).start()

        win_nums_data = get_winning_numbers(game_info[game]['url'])

        logging.info(f'--> {game} --> load_winning_numbers')
        Thread(load_winning_numbers(
            game, game_info[game]['model'], win_nums_data)).start()

        logging.info(f'--> {game} --> load_winning_numbers_combinations')
        Thread(load_winning_numbers_combinations(game, win_nums_data)).start()
    logging.info('Finished')
