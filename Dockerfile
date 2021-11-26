FROM amd64/python:3.6-slim-buster

LABEL maintainer="Dot HQ <contact@dothq.co>"

WORKDIR /app
COPY ./ ./

RUN apt-get update -y
RUN apt-get install git python3-dev libglib2.0-0 libsm6 libxrender1 libxext6 -y

RUN pip3 install torch==1.4.0+cpu -f https://download.pytorch.org/whl/cpu/torch_stable.html
RUN pip3 install git+https://github.com/johnpaulbin/argos-translate.git
RUN pip3 install -r requirements.txt

CMD ["python3", "./translate/application.py"]
