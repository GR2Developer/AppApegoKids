import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { DatabaseProvider } from '../../providers/database/database';








@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /**TEST AREA */
  public users: any;
  public currentUser: any;
  /*--------------------------------- */


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public authProvider: AuthProvider,
    public databaseProvider: DatabaseProvider
  ) {

    
 
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);

    this.currentUser = this.authProvider.getCurrentUser();
    if(this.currentUser != null){
      console.log("(home.ts)this.currentUser.email: " + this.currentUser.email);
      console.log("(home.ts)this.currentUser.displayName: " + this.currentUser.displayName);
    }


    this.databaseProvider.getAllUsers()
      .then((data) => {
        this.users = data;
      })
      .catch();


  }

  async logOut(): Promise<void> {
    console.log("entrei funçao logOut");
    await this.authProvider.logoutUser();
    this.navCtrl.setRoot('SigninPage');
  }

}
