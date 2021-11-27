from flask import Flask
from flask import request

import sqlite3

from argostranslate import package, translate

from os import getenv
from os import listdir
import os

import languages

app = Flask(__name__)
conn = sqlite3.connect("state.db")

conn.execute("CREATE TABLE IF NOT EXISTS keys (id TEXT, name TEXT)")

MODELS_PATH = os.path.join(os.path.dirname(__file__), "models/downloaded/")
models = listdir(MODELS_PATH)

for model in models:
    if model.endswith(".argosmodel"):
        package.install_from_path(MODELS_PATH + model)

installed_languages = translate.get_installed_languages()
names = [str(lang) for lang in installed_languages]

@app.route("/translate", methods = ["POST"])
def translate():
    auth_token = request.headers.get("authorization")

    if auth_token != None:
        auth_token = auth_token.replace("Bearer ", "", 1)

    if auth_token == None or len(auth_token) <= 0:
        return "Invalid API key.", 403, { "content-type": "text/plain" }

    with sqlite3.connect("state.db") as con:
        cur = con.cursor()

        keys = cur.execute("SELECT * FROM keys WHERE id = ?", (auth_token,))
        keys = keys.fetchall()
        
        if len(keys) <= 0:
            return "Invalid API key.", 403, { "content-type": "text/plain" }

        if "from" not in request.json:
            return "Missing \"from\" body parameter.", 400, { "content-type": "text/plain" }

        if "to" not in request.json:
            return "Missing \"to\" body parameter.", 400, { "content-type": "text/plain" }

        if "input" not in request.json:
            return "Missing \"input\" body parameter.", 400, { "content-type": "text/plain" }

        fr = request.json["from"]
        to = request.json["to"]
        input = request.json["input"]

        if fr == to:
            return input, 200, { "content-type": "text/plain" }

        source = fr.replace(fr, languages.all[fr])
        target = to.replace(to, languages.all[to])
        
        if source not in names:
            return f"Language with code \"{fr}\" was not found.", 404, { "content-type": "text/plain" }

        if target not in names:
            return f"Language with code \"{to}\" was not found.", 404, { "content-type": "text/plain" }

        original_language = installed_languages[names.index(source)]
        target_language = original_language.get_translation(installed_languages[names.index(target)])

        translation = target_language.translate(input)
        
        return translation, 200, { "content-type": "text/plain" }

@app.errorhandler(404)
def not_found(e):
    return "Not Found", 404, { "content-type": "text/plain" }

@app.errorhandler(500)
def server_error(e):
    return "Internal Server Error", 500, { "content-type": "text/plain" }

def main():
    host = getenv("TRANSLATE_HOST", default="0.0.0.0")
    port = getenv("TRANSLATE_PORT", default=3000)

    app.run(host=host, port=port)

if __name__ == "__main__":
    main()
