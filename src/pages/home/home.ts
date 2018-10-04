import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';








@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public authProvider: AuthProvider
    ) {

    let currentUser = firebase.auth().currentUser;
    console.log("currentUser email: " + currentUser.email);
  }

  ionViewDidLoad(){
    this.menuCtrl.enable(true);
  }

  async logOut(): Promise<void> {
    console.log("entrei funçao logOut");
    await this.authProvider.logoutUser();
    this.navCtrl.setRoot('SigninPage');
  }

}
