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

**Note**: after setup.py is executed, 5GB will be used.

**Docker** will take ~16GB in total.


```bash
# Clone the repository:
git clone https://github.com/dothq/translate.git
cd translate/

# Build Dockerfile
sudo docker build -t translate .
```

Run the container with `sudo docker run -d -p 3000:3000 translate`

The default authorization key is `universal`

### **Continue without docker:**

Install required dependencies:
```bash
# Install requirements
pip3 install -r requirements.txt
cd translate/

# Download all the available models:
python3 setup.py

# Launch the server
python3 application.py
```

Your API is then available for use via POST to `/translate` (port 3000) using JSON:
<br>
Header: `Authorization: Bearer TOKEN` (default key `universal`)
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

**Our models:**
(These will automatically be installed on setup via `latest.json`)
| Language | Source -> Target | Target -> Source |
| :---: | :---: | :---: |
| 🇳🇱 | [nl -> en](https://cdn.discordapp.com/attachments/842801645611384872/912031467327074374/dutch_en.argosmodel) | [en -> nl](https://cdn.discordapp.com/attachments/842801645611384872/912031363639685130/en_nl.argosmodel) |
| 🏴󠁧󠁢󠁷󠁬󠁳󠁿 | [en -> cy](https://github.com/dothq/translate/releases/download/November-2021/en_cy.argosmodel) | [cy -> en](https://github.com/dothq/translate/releases/download/November-2021/cy_en.argosmodel) |

## ❤️ Acknowledgements

[Argos Translate](https://github.com/argosopentech/argos-translate), which is built on [OpenNMT](https://opennmt.net/), is widely used in this repository for translation.

## 📜 Licenses
**Dot Translate** is licensed under the [MIT](https://spdx.org/licenses/MIT.html) license.
