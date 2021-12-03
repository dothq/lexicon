#!/usr/bin/env python

import subprocess
from shutil import copyfile
from os import path
from models import download_available_models
import os

print("Downloading available translation models from index...")

try:
  # Download all models
  download_available_models()
  
  print("Setup finished")
except:
  print("Model downloading failed.")
