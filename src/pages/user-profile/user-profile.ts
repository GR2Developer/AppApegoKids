import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';
import { Storage } from '@ionic/storage';
import Firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';

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

  public userName: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private loadingCtrl: LoadingController,
    //private authProvider: AuthProvider,
    public storage: Storage
  ) {


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

}
