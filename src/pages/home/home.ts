import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { DatabaseProvider } from '../../providers/database/database';




export interface Slide {    //Exportando a interface onde ficam os slides

  image: string;
}



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  /**TEST AREA */
  public users: any;
  public currentUser: any;
  //public storage: Storage
  /*--------------------------------- */


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public authProvider: AuthProvider,
    public databaseProvider: DatabaseProvider
  ) {

    //let currentUser = firebase.auth().currentUser;
    //console.log("currentUser email: " + currentUser.email);

    this.slides = [                                                             //estrutura dos slides
      {
        image: 'assets/img/padrinhos3.png',
      },
      {
        image: 'assets/img/padrinhos4.png',
      },
      {
        image: 'assets/img/padrinhos5.png',
      }

    ];

  }



  ionViewDidLoad() {
    this.menuCtrl.enable(true);

    this.currentUser = this.authProvider.getCurrentUser();
    if (this.currentUser != null) {
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

  onSlideChangeStart(slider) {                                //starta o slide
    this.showSkip = !slider.isEnd();
  }
}
