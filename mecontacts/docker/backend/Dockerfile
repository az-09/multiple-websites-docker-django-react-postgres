FROM python:3.9-slim-bullseye
RUN apt-get update && apt-get -y install cron

WORKDIR /app
ADD ./backend/requirements.txt /app/backend/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt


ADD ./docker /app/docker
ADD ./backend /app/backend