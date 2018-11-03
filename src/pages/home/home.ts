import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
//import firebase from 'firebase';
import { DatabaseProvider } from '../../providers/database/database';
import { Storage } from '@ionic/storage';
//import { MyApp } from '../../app/app.component';







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
  
  private hotProducts = [];
  



  constructor(

    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public authProvider: AuthProvider,
    public databaseProvider: DatabaseProvider
  ) {
    this.getHotProducts();

    //let currentUser = firebase.auth().currentUser;
    //console.log("currentUser email: " + currentUser.email);

    this.slides = [                                                             //estrutura dos slides
      {
        image: 'assets/img/padrinhos1.png',
      },
      {
        image: 'assets/img/padrinhos4.png',
      },
      {
        image: 'assets/img/padrinhos2.png',
      }

    ];

  }

  getHotProducts(){
    this.databaseProvider.getProductsHot().then(products=>{
      this.hotProducts = products;
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);


  }

  onSlideChangeStart(slider) {                                //starta o slide
    this.showSkip = !slider.isEnd();
  }
  goToHome(){
    this.navCtrl.setRoot('HomePage' ,{}, {animate: true, direction: 'forward'});
    console.log('cliquei nessa poha');
  }

}
