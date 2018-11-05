import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  ActionSheetController,
  ToastController,
  Platform
} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
//import { Storage } from '@ionic/storage';
import Firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { File, FileReader } from '@ionic-native/file';
//import { FilePath } from '@ionic-native/file-path';

declare var cordova;

@IonicPage()
@Component({
  selector: 'page-manage-product',
  templateUrl: 'manage-product.html',
})
export class ManageProductPage {

  private databaseCollection: string = "Products";  //Collection no firestore

  public form: any;
  public isEditable: boolean = false;
  public title: string = 'Adicionar novo produto';

  //variáveis do produto e o uid do usuário que vai publicar/editar o produto
  //public uid: string = '';
  private name: string = '';
  private description: string = '';
  private price: number = null;
  private category: string = '';
  private categories: string[] = [];
  private subcategory: string = '';
  private subcategories: string[] = [];
  private docId: string = '';

  lastImageUrl: string = null;
  private lastImageBase64src: string = null; // string da forma "data:image/jpeg;base64, <base64String>"
  lastImageStoragePath: string = null;

  /**
   * contém o path do file (no dispositivo) ou a url de download da imagem (no caso de edição de um produto)
   */
  private lastImageIsUrl: boolean = false;
  //-------------------------------------------------------------//



  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private databaseProvider: DatabaseProvider,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    //private file: File,
    //private filePath: FilePath,
    public platform: Platform,
    private toastCtrl: ToastController
  ) {
    this.getCategories();


    this.form = formBuilder.group({
      'name': [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20)])
      ],
      'description': ['',
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ],
      'price': ['', Validators.required],
      'category': ['', Validators.required],
      'subcategory': ['', Validators.required]
    });

    if (this.navParams.get('isEdited')) {

      let record = navParams.get('record');
      this.name = record.product.name;
      this.description = record.product.description;
      this.price = record.product.price;
      this.docId = record.product.docId;
      this.category = record.product.category;
      this.updateSubcategories(this.category);
      this.subcategory = record.product.subcategory;
      this.lastImageUrl = record.product.imgUrl;
      this.lastImageStoragePath = record.product.imgPath;
      this.isEditable = true;
      this.lastImageIsUrl = true;
      this.title = 'Atualizar produto';
    }
    else {
      //this.databaseCollection = navParams.get('collection');
      console.log("(manage-products) dbCollection: " + this.databaseCollection);

      this.isEditable = false;

    }

  }

  updateSubcategories(category) {
    this.databaseProvider.getCategoryData(category).then(categoryData => {
      this.subcategories = categoryData[0].subcategories;
    })
  }

  getCategories() {
    this.databaseProvider.getCategoryData().then((categories: any[]) => {
      categories.forEach(element => {
        this.categories.push(element.category);
      });
      console.log('this.categories: ', this.categories.join(', '));
    });
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha a origem da imagem',
      buttons: [
        {
          text: 'Galeria',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    //opções para a foto
    let cameraOptions: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetHeight: 600,
      targetWidth: 600,
      allowEdit: true,
      sourceType: sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(cameraOptions).then(imageBase64 => {
      this.lastImageBase64src = "data:image/jpeg;base64," + imageBase64;
      this.lastImageIsUrl = false;
    }, (err) => {
      this.presentToast('Erro ao selecionar a imagem.');
      console.dir(err);
    });

  }


/*
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    console.log(("createfilenane: " + newFileName));
    return newFileName;
  }*/



  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  saveDocument(): void {
    //Adiciona um loading na tela para bloquear interação do usuário
    const loading: Loading = this.loadingCtrl.create();
    loading.present();
    console.log("Entered saveDocument");
    let name: string = this.form.controls["name"].value,
      //ab: string = this.form.value.description,
      description: string = this.form.controls["description"].value,
      price: string = this.form.controls["price"].value,
      category: string = this.form.controls["category"].value,
      subcategory: string = this.form.controls["subcategory"].value;
    console.log("savdocument price: " + price);

    if (this.isEditable) {
      console.log("entrei isEditable");
      if (this.lastImageIsUrl) {//usuário não mudou a imagem
        console.log("before update documento without change photo");
        this.databaseProvider.updateDocument(this.databaseCollection,
          this.docId,
          {
            name: name,
            description: description,
            price: price,
            category: category,
            subcategory: subcategory
          }
        ).then(() => {
          this.clearForm();
          loading.dismissAll();
          this.displayAlert('Feito!', 'O produto ' + name + ' foi atualizado com sucesso');
          this.navCtrl.pop();
        }).catch((error) => {
          loading.dismissAll();
          this.displayAlert('Updating document failed', error.message);
        });
      }
      else {//usuário mudou a imagem
        console.log("before delete image in storage documento with change photo");
        this.databaseProvider.deleteImageInStorage(this.lastImageStoragePath);
        const uid: string = Firebase.auth().currentUser.uid;
        //console.log("64tr: " + base64Str);
        this.databaseProvider.uploadImageAndReturnUrlAndPath(this.lastImageBase64src, uid).then(
          imageData => {
            this.databaseProvider.updateDocument(
              this.databaseCollection,
              this.docId,
              {
                name: name,
                description: description,
                price: price,
                category: category,
                subcategory: subcategory,
                imgUrl: imageData.downloadUrl,
                imgPath: imageData.path
              }
            ).then(() => {
              this.clearForm();
              loading.dismissAll();
              this.displayAlert('Feito!', 'O produto ' + name + ' foi atualizado com sucesso');
              this.navCtrl.pop();
            }).catch((error) => {
              this.displayAlert('Updating document failed', error.message);
              loading.dismissAll();
            });
          },
          error => {
            console.log("error UploadImageandReturnData: " + error);
            this.displayAlert('Adicionar produto falhou', error.message);
            loading.dismissAll();
          }
        );

      }
    }
    else {//Usuário está cadastrando um produto, adicionar as flags de visibilidade (hot, promoção, etc.)
      console.log("entrei else cadastro produto");
      const uid = Firebase.auth().currentUser.uid;
      console.log("uid: ", uid);
      this.databaseProvider.uploadImageAndReturnUrlAndPath(this.lastImageBase64src, uid).then(
        imageData => {
          console.log("uploadImageStorage and return data: ");
          console.dir(imageData);
          this.databaseProvider.addDocument(
            this.databaseCollection,
            {//Colocar aqui os campos que vão ser armazenados no banco de dados
              name: name,
              description: description,
              price: price,
              ownerUid: uid,
              category: category,
              subcategory: subcategory,
              imgUrl: imageData.downloadUrl,
              imgPath: imageData.path,
              flagHot: false
            }
          ).then(data => {
            console.log("fiz o add document do database provider");
            this.clearForm();
            this.displayAlert('Produto cadastrado!', 'O produto ' + name + ' foi adicionado com sucesso.');
            loading.dismissAll();
          }).catch(error => {
            this.displayAlert('Adicionar produto falhou', error.message);
            loading.dismissAll();
          });

        },
        error => {
          console.log("error UploadImageandReturnData: " + error);
          this.displayAlert('Adicionar produto falhou', error.message);
          loading.dismissAll();
        }
      );


    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageProductPage');
  }

  displayAlert(title: string,
    message: string): void {
    let alert: any = this.alertController.create({
      title: title,
      subTitle: message,
      buttons: ['OK!']
    });
    alert.present();
  }


  clearForm(): void {
    this.name = '';
    this.description = '';
    this.price = 0;
    this.lastImageBase64src = null;
  }

}
