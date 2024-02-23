FROM python:3.10

RUN apt-get update \
    && apt-get install -y gcc default-libmysqlclient-dev pkg-config \ 
    && apt-get install -y wkhtmltopdf

# set work directory
WORKDIR /app

# set environment variables
#ENV PYTHONDONTWRITEBYTECODE 1
#ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . /app

CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:8000", "backend.wsgi:application"]