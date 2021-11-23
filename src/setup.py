import subprocess
from shutil import copyfile
from os import path

print("Updating Argos translation model database...")
subprocess.check_call("argospm update", shell=True)

subprocess.check_call("argospm list", shell=True)
models = subprocess.getoutput("argospm list").split("\n")

x = 0

for model in models:
    x = x+1

    split_name = model.split('translate-')[1]
    out_name = f"{split_name.split('_')[0]}-{split_name.split('_')[1].upper()}.argosmodel"

    argos_model_path = f"{path.expanduser('~')}/.local/cache/argos-translate/downloads/{model}.argosmodel"
    out_model_path = path.abspath(f"./models/{out_name}")

    subprocess.getoutput(f"argospm install {model}")
    print(f"Installed package to path {out_model_path} ({x}/{len(models)})")

    copyfile(
        argos_model_path, 
        out_model_path
    )