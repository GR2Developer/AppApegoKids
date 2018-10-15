import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';
import { Storage } from '@ionic/storage';

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
  private uid: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public databaseProvider: DatabaseProvider,
    public storage: Storage
  ) {
    this.storage.get('user').then((user) => {
      this.uid = user.uid;
      this.databaseProvider.getUserData(this.uid).then((data: any) => {
        this.userName = data[0].name;
        //console.log('user name: ' + this.userName);
        //console.log('user data: ');
        console.dir(this.userName);
        console.log("dasdas: " + data[0].name);
      });

    });

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

  goToUserProductsList() {
    this.navCtrl.push("UserProductsListPage");
  }

}
