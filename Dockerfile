FROM amd64/python:3.6-slim-buster

LABEL maintainer="Dot HQ <contact@dothq.co>"

WORKDIR /app
COPY ./ ./

RUN apt-get update -y
RUN apt-get install git python3-dev libglib2.0-0 libsm6 libxrender1 libxext6 -y

RUN pip3 install -r requirements.txt

RUN python3 translate/models.py download_models
RUN python3 translate/db.py add_key universal
CMD ["python3", "translate/application.py"]
