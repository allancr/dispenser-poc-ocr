# Dispenser - PoC - Processador OCR
Projeto para experimentar e demonstrar o processamento OCR de imagens com o objetivo de capturar informações textuais de fogos de documentos de identificação pessoal com projeto híbrido para smartphones com Ionic 3.

## Debugando a aplicação em um dispositivo com Android
```
$ git clone https://gitlab.allancr.webredirect.org/sesdf/dispenser/pococr.git
$ cd pococr
$ ionic cordova run android --device -lc
```

## Gerando um instalador APK
```
$ ionic cordova build android --prod #--release
```
O pacote estará disponível em platforms/android/app/build/outputs/apk/debug/app-debug.apk.

## Fontes
* [Ionic Framework](https://ionicframework.com/docs/)
* [Ocrad.js](antimatter15.com/ocrad.js/demo.html)
* [Ionic 2 OCR Example](https://github.com/matiastucci/ionic-ocr-example)
* [Tesseract.js](tesseract.projectnaptha.com)