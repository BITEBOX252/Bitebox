#Stage 1
FROM node:16 as build_stage
WORKDIR /code
COPY ./frontend/ /code/frontend 

WORKDIR /code/frontend

RUN npm install
RUN npm run build

#Stage 2
FROM python:3.11.0

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /code
COPY ./backend/ /code/backend

RUN pip install -r ./backend/requirements.txt

COPY --from=build:stage ./code/frontend/build /code/backend/static/
COPY --from=build:stage ./code/frontend/build/static /code/backend/static/
COPY --from=build:stage ./code/frontend/build/index.html /code/backend/backend/templates/index.html

RUN python ./backend/manage.py migrate
RUN python ./backend/manage.py collectstatic --no-input

EXPOSE 80

WORKDIR /code/backend

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
CMD ["daphne", "-b", "0.0.0.0", "-p", "8001", "backend.asgi:application"]
