import subprocess
from shutil import copyfile
from os import path
from models import download_available_models

print("Downloading available translation models from index...")

try:
  download_available_models()
  print("Setup finished")
except:
  print("Model downloading failed.")