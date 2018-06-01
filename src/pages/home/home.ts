import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  srcImage: string;
  OCRAD: any;
  Tesseract: any;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private camera: Camera
  ) {}

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Escolher imagem',
          handler: () => {
            this.getPicture(0); // 0 == Library
          }
        },{
          text: 'Fotografar',
          handler: () => {
            this.getPicture(1); // 1 == Camera
          }
        },{
          text: '(demo) Texto Limpo',
          handler: () => {
            this.srcImage = 'assets/imgs/demo1.png';
          }
        },{
          text: '(demo) Identidade Cor',
          handler: () => {
            this.srcImage = 'assets/imgs/demo2.png';
          }
        },{
          text: '(demo) Identidade P&B',
          handler: () => {
            this.srcImage = 'assets/imgs/demo3.png';
          }
        },{
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: number) {
    this.camera.getPicture 	({
      quality: 100,
      destinationType: 0,
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.srcImage = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  // Fonte: https://github.com/matiastucci/ionic-ocr-example
  ocradjs() {
    let loader = this.loadingCtrl.create({
     content: 'Processando imagem com OCRAD JS...'
    });
    loader.present();
    (<any>window).OCRAD(document.getElementById('image'), text => {
      loader.dismissAll();
      text = `\n\n*** Tentativa de interpretação ***\n${JSON.stringify(this.extrairRg(text))} \n\n${text}`;
      console.log(text);
      alert(text);
    });
  }

  // Fonte: https://github.com/naptha/tesseract.js
  tesseractjs() {
    let loader = this.loadingCtrl.create({
     content: 'Processando imagem com Tesseract JS...'
    });
    loader.present();

    (<any>window).Tesseract.recognize(document.getElementById('image'))
  	.then(result => {
  	    console.log(result)
  	    loader.dismissAll();
        result.text = `\n\n*** Tentativa de interpretação ***\n${JSON.stringify(this.extrairRg(result.text))} \n\n${result.text}`;
  	    console.log(result.text);
  	    alert(result.text);
  	});
  }

  extrairRg(ocr: string) {
    var rg: any = /([0-9-.]){3}\w+/;
    var nome: any = /([A-Z']{2,} ){2,}\w+/;
    var cpf: any = /([0-9-.]){11}\w+/;

    rg = ocr.match(rg);
    nome = ocr.match(nome);
    cpf = ocr.match(cpf);

    return {
      'rg': rg && rg.length > 0 ? rg[0] : '<NÃO ENCONTRADO>',
      'nome': nome && nome.length > 0 ? nome[0] : '<NÃO ENCONTRADO>',
      'cpf': cpf && cpf.length > 0 ? cpf[0] : '<NÃO ENCONTRADO>'
    };
  }

  restart() {
    this.srcImage = '';
    this.presentActionSheet();
  }

}
