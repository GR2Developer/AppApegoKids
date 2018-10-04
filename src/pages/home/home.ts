import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';








@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {

  }

  ionViewDidLoad(){
    this.menuCtrl.enable(true);
  }

}
