# Dispenser - PoC - Leitor QR code
Projeto para experimentar e demonstrar a leitura de códigos QR com projeto híbrido para smartphones com Ionic 3.

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
O pacote estará disponível em .

## Fontes
* [Ionic Framework](https://ionicframework.com/docs/)
* [Ocrad.js](antimatter15.com/ocrad.js/demo.html)
* [Ionic 2 OCR Example](https://github.com/matiastucci/ionic-ocr-example)
* [Tesseract.js](tesseract.projectnaptha.com)