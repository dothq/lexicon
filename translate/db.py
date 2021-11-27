import argparse
import os
import sqlite3
import time

DB_NAME = "state.db"
DB_PATH = os.path.join(os.path.dirname(__file__), DB_NAME)
conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

cur.execute("CREATE TABLE IF NOT EXISTS keys (id TEXT, name TEXT)")

def add_key(value):
  uuid = int(str(time.time()).replace(".", ""))
  try:
    cur.execute("""
INSERT INTO
  keys (id, name)
VALUES
    (?, ?);""", (value, uuid))
    conn.commit()
    print(f"Added {value} | {uuid}")
  except:
    print("Operation failed")
    
def get_keys(value=None):
  if value != None:
    try:
      key = cur.execute("SELECT * FROM keys WHERE id = ?", (value,)).fetchall()
      if len(key) <= 0:
        print("Key not found in DB")
      else:
        print(str(key))
    except:
      print("Operation failed")
  else:
    try:
      keys = cur.execute("""SELECT * FROM keys;""").fetchall()
      print(str(keys))
    except:
      print("Operation failed")

def remove_key(value):
  try:
    cur.execute("DELETE FROM keys WHERE id = ?", (value,))
    conn.commit()
    print(f"Removed {value}")
  except:
    print("Operation failed")

if __name__ == "__main__":
  parser = argparse.ArgumentParser("models")
  parser.add_argument('do', help='add_key | get_keys | remove_key + VALUE (or "all" if supported)', nargs=2, default='get_keys')
  args = parser.parse_args()

  if args.do[0] == "add_key":
    add_key(args.do[1])
  elif args.do[0] == "get_keys":
    if args.do[1] == "all":
      get_keys()
    else:
      get_keys(args.do[1])
  elif args.do[0] == "remove_key":
    remove_key(args.do[1])