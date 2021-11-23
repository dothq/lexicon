FROM amd64/python:3.6-slim-buster

WORKDIR /app
COPY ./ ./

RUN apt-get update -y
RUN apt-get install python3-dev libglib2.0-0 libsm6 libxrender1 libxext6 -y

RUN pip3 install torch==1.4.0+cpu -f https://download.pytorch.org/whl/cpu/torch_stable.html
RUN pip3 install argostranslate
RUN pip3 install -r requirements.txt

EXPOSE 3000
ENTRYPOINT ["python3", "./src/application.py"]