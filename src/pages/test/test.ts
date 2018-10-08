import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';




@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  public users: any;
  public currentUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public authProvider: AuthProvider,
    public databaseProvider: DatabaseProvider
  ) {
    this.currentUser = this.authProvider.getCurrentUser();
    if (this.currentUser != null) {
      console.log("(test.ts)this.currentUser.email: " + this.currentUser.email);
      console.log("(test.ts)this.currentUser.displayName: " + this.currentUser.displayName);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    this.menuCtrl.enable(true);



    this.databaseProvider.getAllUsers()
      .then((data) => {
        this.users = data;
      })
      .catch();


  }

  logOut(): void {
    console.log("entrei funçao logOut");
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('SigninPage');
    });

  }


}
