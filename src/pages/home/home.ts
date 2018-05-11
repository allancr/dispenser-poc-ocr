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
          text: 'Demonstração - Texto Limpo',
          handler: () => {
            this.srcImage = 'assets/imgs/demo1.png';
          }
        },{
          text: 'Demonstração - RG Cor',
          handler: () => {
            this.srcImage = 'assets/imgs/demo2.png';
          }
        },{
          text: 'Demonstração - RG P&B',
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
	.then(function(result){
	    console.log(result)
	    loader.dismissAll();
	    console.log(result);
	    alert(result.text);
	});
  }

  restart() {
    this.srcImage = '';
    this.presentActionSheet();
  }

}
