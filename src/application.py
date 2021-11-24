from flask import Flask
from flask import request

from argostranslate import package, translate

from os import getenv
from os import listdir

import languages

app = Flask(__name__)

models = listdir("./models")

for model in models:
    package.install_from_path(f"./models/{model}")

installed_languages = translate.get_installed_languages()
names = [str(lang) for lang in installed_languages]

@app.route("/translate", methods = ["POST"])
def translate():
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

    source = fr.lower().replace(fr, languages.all[fr])
    target = to.lower().replace(to, languages.all[to])
    
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