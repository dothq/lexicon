import json
import urllib.request
import argparse
import os
from shutil import rmtree

MODEL_JSON = "latest.json"
dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, f"models/{MODEL_JSON}")

data = json.load(open(filename))

def print_available_models():
  for model in data:
    print(f"{model['from_name']} -> {model['to_name']}")

def download_available_models():
  MODEL_DOWNLOAD_PATH = os.path.join(dirname, f"models/downloaded")

  try:
    rmtree(MODEL_DOWNLOAD_PATH)
  except:
    pass

  os.makedirs(MODEL_DOWNLOAD_PATH)

  print(f"Installing from {MODEL_JSON} feel free to edit this file to point to another JSON.")

  for model in data:
    print(f"Downloading {model['from_name']} -> {model['to_name']}")

    MODEL_NAME = f"{model['from_code']}-{model['to_code'].upper()}.argosmodel"

    with open(f"{MODEL_DOWNLOAD_PATH}/{MODEL_NAME}", "wb") as f:
      f.write(urllib.request.urlopen(model['links'][0]).read())

if __name__ == "__main__":
  parser = argparse.ArgumentParser("models")
  parser.add_argument("do", help="display_models | download_models", type=str)
  args = parser.parse_args()

  if args.do == "list_models":
    print_available_models()
  elif args.do == "download_models":
    download_available_models()
