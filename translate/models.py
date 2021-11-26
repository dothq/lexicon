import json
import urllib.request
import argparse

MODEL_JSON = "latest.json"
data = json.load(open(f"models/{MODEL_JSON}"))

def print_available_models():
  for model in data:
    print(f"{model['from_name']} -> {model['to_name']}")

def download_available_models():
  print(f"Installing from {MODEL_JSON} feel free to edit this file to point to another JSON.")
  for model in data:
    print(f"Downloading {model['from_name']} -> {model['to_name']}")
    MODEL_LINK = model['links'][0]
    with open(f"models/downloaded/{MODEL_LINK.split('/')[-1]}", "wb") as f:
      f.write(urllib.request.urlopen(MODEL_LINK).read())

if __name__ == "__main__":
  parser = argparse.ArgumentParser("models")
  parser.add_argument("do", help="display_models | download_models", type=str)
  args = parser.parse_args()

  if args.do == "list_models":
    print_available_models()
  elif args.do == "download_models":
    download_available_models()