from flask import Flask, jsonify, request
from flask_docs import ApiDoc

import sqlite3
from argostranslate import package, translate
from os import getenv, listdir
import os
import languages

app = Flask(__name__)

MODELS_PATH = os.path.join(os.path.dirname(__file__), "models/downloaded/")
models = listdir(MODELS_PATH)

for model in models:
    if model.endswith(".argosmodel"):
        print(f"Loading {model}")
        package.install_from_path(MODELS_PATH + model)

installed_languages = translate.get_installed_languages()
names = [str(lang) for lang in installed_languages]

def throw_error(code, message):
    return jsonify(
        ok = False,
        message = message
    ), code, { "content-type": "application/json" }

def send_translation_response(translation, fr, to):
    data = {
        "translation": translation,
        "from": fr,
        "to": to
    }

    return jsonify(data), 200, { "content-type": "application/json" }

TRANSLATE_HELP_MESSAGE = """Translate

### Methods
GET, POST

### Structure
| Name  | Nullable? | Location | Type | Notes              |
|-------|-----------|----------|------|--------------------|
| from  | false     | body     | str  | Source Language    |
| to    | false     | body     | str  | Target Language    |
| input | false     | body     | str  | Input to Translate |

### Request
{
    "from": "en",
    "to": "es",
    "input": "Hello"
}

### Response
{
    "from": "en",
    "to": "es",
    "translation": "Hola."
}
"""

@app.route("/translate", methods = ["GET", "POST"])
def translate():
    if request.method == "GET":
        return TRANSLATE_HELP_MESSAGE, 200, { "content-type": "text/plain" }

    fr = request.json["from"]
    to = request.json["to"]
    input = request.json["input"]

    if fr == to:
        return send_translation_response(input, fr, to)

    source = fr.replace(fr, languages.all[fr])
    target = to.replace(to, languages.all[to])
    
    if source not in names:
        return throw_error(404, f"Language with code \"{fr}\" was not found.")

    if target not in names:
        return throw_error(404, f"Language with code \"{to}\" was not found.")

    original_language = installed_languages[names.index(source)]
    target_language = original_language.get_translation(installed_languages[names.index(target)])

    translation = target_language.translate(input)
    
    return send_translation_response(translation, fr, to)

@app.errorhandler(404)
def not_found(e):
    return throw_error(404, "Not Found")

@app.errorhandler(405)
def server_error(e):
    return throw_error(405, "Method Not Allowed")

@app.errorhandler(500)
def server_error(e):
    return throw_error(500, "Internal Server Error")

@app.route("/")
def index():
    return str(names), 200, { "content-type": "text/plain" }

def main():
    host = getenv("TRANSLATE_HOST", default="0.0.0.0")
    port = getenv("TRANSLATE_PORT", default=3000)

    app.run(host=host, port=port)

if __name__ == "__main__":
    main()
