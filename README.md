# Dot Translate
🌐 A microservice for quick and local translation using A.I.

---

This service starts a local webserver used for neural machine translation.


## 🚀 Features

|  | Dot Translate |
| - | ------------ |
| 🔒 | **No tracking or telemetry** data is collected from you |
| 🆓 | **Always free** |
| ⚡️ | **Fast** on low-compute machines |
| 📝 | **Accurate** and keeps your prompt meaningful |
| 💻 | **Open-source** and open for contributions |

For inference, all models are ran on the CPU. Every model utilized in this service are 8-bit quantized, which results in decreased latency and storage costs.

## 📦️ Setup

Note before starting: after all of our models download, it will take up about 5GB on disk.

Download the repository to disk:
```
git clone https://github.com/dothq/translate.git
cd translate/
```

Then build our Dockerfile with `sudo docker build -t translate .`

Run the container with `sudo docker run -d -p 3000:3000 translate`

**Note:** if you want to add a auth key inside the docker container, interact with the container with bash via:
```
sudo docker exec -it <image> /bin/bash
```
Then run: `python3 ./translate/db.py add_key [value]` and restart the flask server.

### **Continue without docker:**

Install required dependencies:
```bash
pip3 install -r requirements.txt
cd translate/
```

Download all the available models:
```bash
python3 setup.py
```

Launch the server:
```bash
python3 application.py
```

The API is available for use via POST to `/translate` (port 3000) using JSON:
<br>
Header: `Authorization: Bearer TOKEN` (a DB will be created under `translate` after the server is launched)
```
{
  "from": "en",
  "to": "es",
  "input": "This is a test translation using Dot Translate!"
}
```
Response will be in plain text.

**Adding a auth token to DB:**

Run:
```
python3 ./translate/db.py add_key [value]
```
Make sure to restart server to make changes take affect.

## 🔧 Contributing

We accept all positive contributions that affects this repository and service as a whole; we accept trained .argosmodels files via pull request. 

| Language | Source -> Target | Target -> Source |
| :---: | :---: | :---: |
| 🇳🇱 | [nl -> en](https://cdn.discordapp.com/attachments/842801645611384872/912031467327074374/dutch_en.argosmodel) | [en -> nl](https://cdn.discordapp.com/attachments/842801645611384872/912031363639685130/en_nl.argosmodel) |

## ❤️ Acknowledgements

[Argos Translate](https://github.com/argosopentech/argos-translate), which is built on [OpenNMT](https://opennmt.net/), is widely used in this repository for translation.

## 📜 Licenses
**Dot Translate** is licensed under the [MIT](https://spdx.org/licenses/MIT.html) license.
