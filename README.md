![image](https://user-images.githubusercontent.com/84251099/171055617-0ee90cc0-5b90-416c-803d-6dbdffe5fd4f.png)
<p align="center">
<img alt="python" src="https://img.shields.io/badge/python-3.10-blue"></img>
<img alt="opencv" src="https://img.shields.io/badge/open--cv--headless-4.5.5.64-blue"></img>
<img alt="nodejs" src="https://img.shields.io/badge/nodejs-v14-blue"></img>
<img alt="contributors" src="https://img.shields.io/badge/contributors-3-brightgreen"></img>
<img alt="test" src="https://img.shields.io/badge/test-passing-green"></img>
</p>  
<hr>

# Overview

## OpenEyes

What OpenEye does (functional requeriments)
1. Give your current location on the map (uninorte)
2. Get routes with instructions to different buildings of the university.
3. Get list of objects in user's surroundings.
4. Recognise text on books, letters and more.

## Demo
We've deployed the app on heroku for [demo](https://blindaigps.herokuapp.com/). It may take up to 10 seconds to load.

## Description
[OpenEye](https://blindaigps.herokuapp.com/) is an initiative to promote inclusivity with respect to people with visual disabilities, so that they do not feel alienated at the Universidad del Norte. The OpenEye is a project to promote and help people with perception difficulties who cannot identify people, objects, spaces, etc. visually, and who have difficulty reading texts that do not have adequate typography,

## Installation

1. Please do install [nodejs](https://nodejs.org/dist/v16.15.0/node-v16.15.0-x64.msi) and set up your local environment variables in your desktop, then
clone or download this repository https://github.com/FiboDev/OpenEyes
2. Run npm command in your cmd or bash 
```bash 
npm install
```
This will ensure the installation of dependencies in package.json file
3. Install python requirements
Use the package manager [pip](https://pip.pypa.io/en/stable/) to install requirements.txt.

```bash
pip install -r requirements.txt
```
Additionally you may install tesseract in your machine <br>
[tesseract-ocr-w32-setup-v5.1.020220510.exe](https://digi.bib.uni-mannheim.de/tesseract/tesseract-ocr-w64-setup-v5.1.0.20220510.exe) <br>
[tesseract-ocr-w64-setup-v5.1.020220510.exe](https://digi.bib.uni-mannheim.de/tesseract/tesseract-ocr-w64-setup-v5.1.0.20220510.exe)

Then in src/public/python/main.py 

```python 
texto = td.DetectorTexto("C:/Program Files/Tesseract-OCR/tesseract.exe") #paste here the route of your tesseract.exe file

texto.obtener_imagen()

print(texto.detectar_texto())
```

# Getting started

## Usage

```bash
npm run start
```
Then open your browser in localhost with port 3000 e.g http://localhost:3000/ and click the screen to get started.

