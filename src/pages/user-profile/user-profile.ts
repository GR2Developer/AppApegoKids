import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  AlertController
} from 'ionic-angular';



import { Storage } from '@ionic/storage';
import Firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { ImageLoader } from 'ionic-image-loader';


/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  private database: Firebase.firestore.Firestore;
  private unsub: any;

  public myProducts: any[];
  public myIndex: any; //index da tabela html para exclusão correta dos itens

  public userName: any;
  private productsCollection: string = "Products";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private loadingCtrl: LoadingController,
    public alertController: AlertController,
    //private authProvider: AuthProvider,
    public storage: Storage
  ) {
    this.database = Firebase.firestore();
    this.addListener();


    //console.log("uid: "+Firebase.auth().currentUser.uid)
    // this.databaseProvider.getUserData(Firebase.auth().currentUser.uid).then((data: any) => {
    //   console.dir(data);
    //   // this.userName = data[0].name;
    //   // //console.log('user name: ' + this.userName);
    //   // //console.log('user data: ');
    //   // console.dir(this.userName);
    //   // console.log("dasdas: " + data[0].name);
    // });




  }


  ionViewDidLoad() {
    const loading = this.loadingCtrl.create();
    loading.present();
    console.log('ionViewDidLoad UserProfilePage');
    const userUid = Firebase.auth().currentUser.uid;
    this.databaseProvider.getUserData(userUid).then(userData=>{
      console.log("userName: ");
      console.dir(userData[0].name);
      this.userName = userData[0].name;
      loading.dismiss();
    });
  }

  goToUserProductsList() {
    this.navCtrl.push("UserProductsListPage");
  }

  addListener(): any {
    const uid = Firebase.auth().currentUser.uid;
    this.unsub = this.database.collection(this.productsCollection).where('ownerUid', '==', uid).onSnapshot(querySnapshot => {
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


  
  deleteDocument(obj): void {
    //Adiciona um loading na tela para bloquear interação do usuário
    const loading: Loading = this.loadingCtrl.create();
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
}
