# Multiple websites (Django, React, Postgres) with Docker for local development

### Example websites and urls
- lottocombo.localhost
- mecontacts.localhost

### Directory structure
```
.
+-- lottocombo.localhost
|    +-- backend
|    +-- data
|    +-- docker
|    +-- frontend
|    +-- .env
|    +-- docker-compose.yml
+-- mecontacts.localhost
|    +-- backend
|    +-- data
|    +-- docker
|    +-- frontend
|    +-- .env
|    +-- docker-compose.yml
+-- nginx-proxy
     +-- docker-compose.yml   
```

### nginx-proxy
- create docker network and start nginx-proxy service
```
docker network create nginx-proxy
cd nginx-proxy
docker-compose up --build -detach
```
### hosts file
- add two websites to hosts file (Windows) in C:\Windows\System32\drivers\etc

```
127.0.0.1 lottocombo.localhost
127.0.0.1 mecontacts.localhost
```

### lottocombo.localhost
- modify .env in lottocombo.localhost folder
```
# env for docker-compose.yml
PROJECT_NAME=lottocombo
POSTGRES_DB=lottocombo
POSTGRES_USER=lottocombo
POSTGRES_PASSWORD=lottocombo
VIRTUAL_HOST=lottocombo.localhost
```

- update proxy_pass @proxy_api on default.conf in docker/nginx/development
```
    location @proxy_api {
        ...
        proxy_pass   http://backend-lottocombo:8000; # backend-PROJECT_NAME:8000
    }
```
- modify .env in lottocombo.localhost/backend/lottocomboapi/
```
# env for django
SECRET_KEY=xxxxxxxxxxxxxxx
DEBUG=False
POSTGRES_DB=lottocombo
POSTGRES_USER=lottocombo
POSTGRES_PASSWORD=lottocombo
POSTGRES_HOST=db-lottocombo
POSTGRES_PORT=5432
```
- start lottocombo services
```
cd lottocombo.localhost
docker-compose up --build -detach
```
### mecontacts.localhost
- repeat steps for lottocombo.localhost

### notes
- docker-compose for website. "VIRTUAL_HOST=${VIRTUAL_HOST}"
```
  environment:
      - "VIRTUAL_HOST=${VIRTUAL_HOST}" # working
      - VIRTUAL_HOST="${VIRTUAL_HOST}" # not working
```
- frontend in mecontacts.localhost. .env is required for firebase
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_ID=
REACT_APP_FIREBASE_API_ID=
```

### References
- https://www.datanovia.com/en/lessons/how-host-multiple-https-websites-on-one-server/
- https://francoisromain.medium.com/set-a-local-web-development-environment-with-custom-urls-and-https-3fbe91d2eaf0

