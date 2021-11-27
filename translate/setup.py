#!/usr/bin/env python

import subprocess
from shutil import copyfile
from os import path
from models import download_available_models
import os
import sqlite3
from db import add_key

print("Downloading available translation models from index...")

try:
  # Download all models
  download_available_models()

  # Setup default key in DB
  DB_NAME = "state.db"
  DB_PATH = os.path.join(os.path.dirname(__file__), DB_NAME)
  conn = sqlite3.connect(DB_PATH)
  cur = conn.cursor()

  cur.execute("CREATE TABLE IF NOT EXISTS keys (id TEXT, name TEXT)")
  
  # Key name, feel free to change
  add_key("universal")
  
  print("Setup finished")
except:
  print("Model downloading failed.")
