import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  AlertController
} from 'ionic-angular';


//import { MyApp } from '../../app/app.component';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
//import { Storage } from '@ionic/storage';
import Firebase from 'firebase';

import { ImageLoader } from 'ionic-image-loader';



@IonicPage()
@Component({
  selector: 'page-user-products-list',
  templateUrl: 'user-products-list.html',
})
export class UserProductsListPage {

  private database: Firebase.firestore.Firestore;

  //variável usada para dar unsubscribe no listener do firestore, apenas usar: this.unsub();
  private unsub: any;
  private productsCollection: string = "Products";  //Collection no firestore

  public myProducts: any[];
  public myIndex: any; //index da tabela html para exclusão correta dos itens


  constructor(
    public navCtrl: NavController,
    // public myApp: MyApp,
    public databaseProvider: DatabaseProvider,
    public imgLoader: ImageLoader,
    public authProvider: AuthProvider,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public navParams: NavParams) {
    this.database = Firebase.firestore();

  }

  ionViewDidLoad() {
    this.loadingController.create().dismissAll();
    this.addListener();


    console.log('ionViewDidLoad UserProductsListPage');
    // if (Firebase.auth().currentUser != null) {
    //   this.retrieveUserProducts();
    // }

  }

  addListener(): any {
    const uid = Firebase.auth().currentUser.uid;
    this.unsub = this.database.collection(this.productsCollection).where('uid', '==', uid).onSnapshot(querySnapshot => {
      this.myProducts = [];
      querySnapshot.forEach(doc => {
        console.log("doc database");
        console.dir(doc.data());
        this.myProducts.push({
          docId: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          category: doc.data().category,
          subcategory: doc.data().subcategory,
          imgUrl: doc.data().imgUrl,
          imgPath: doc.data().imgPath
        });
      });
    })
  }


/*
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.retrieveUserProducts();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }*/

  addDocument() {
    this.navCtrl.push("ManageProductPage", { isEdited: false, collection: this.productsCollection });
  }

  updateDocument(obj): void {
    let params: any = {
      collection: this.productsCollection,
      product: obj
    };
    this.navCtrl.push('ManageProductPage', { record: params, isEdited: true });
  }


/*
  retrieveUserProducts(): void {
    this.databaseProvider.getUserProducts(Firebase.auth().currentUser.uid).then(
      data => {
        console.dir(data);
        this.myProducts = data;
      }
    ).catch();

  }*/

  /*
  setIndex(no: any): void {
    this.myIndex = no;
  }*/




  deleteDocument(obj): void {
    //Adiciona um loading na tela para bloquear interação do usuário
    const loading: Loading = this.loadingController.create();
    loading.present();
    this.databaseProvider.deleteImageInStorage(obj.imgPath).then(() => {
      this.databaseProvider.deleteDocument(this.productsCollection,
        obj.docId)
        .then(() => {
          loading.dismissAll();
          this.displayAlert('Feito!', 'O produto ' + obj.name + ' foi removido com sucesso.');
        })
        .catch((error: any) => {
          loading.dismissAll();
          this.displayAlert('Erro', error.message);
        });
    });
  }

  displayAlert(title: string,
    message: string): void {
    let alert: any = this.alertController.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'OK!'
      }]
    });
    alert.present();
  }

  /*
  preloadImage(imgSrc, callback) {
    let objImagePreloader: HTMLImageElement = new Image();

    objImagePreloader.src = imgSrc;
    if (objImagePreloader.complete) {
      callback();
      objImagePreloader.onload = () => { };
    }
    else {
      objImagePreloader.onload = () => {
        callback();
        //    clear onLoad, IE behaves irratically with animated gifs otherwise
        objImagePreloader.onload = function () { };
      }
    }
  }*/

}
