import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { MyApp } from '../../app/app.component';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-user-products-list',
  templateUrl: 'user-products-list.html',
})
export class UserProductsListPage {

  public currentUser: any;
  private databaseCollection: string = "Products";  //Collection no firestore


  constructor(
    public navCtrl: NavController,
   // public myApp: MyApp,
    public databaseProvider: DatabaseProvider,
    public authProvider: AuthProvider,
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProductsListPage');
    this.currentUser = this.authProvider.getCurrentUser();
    if (this.currentUser != null) {
      console.log('(UserProductsListPage.ts) user is not null: ' + this.currentUser.uid);
    }
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    //this.retrieveUserProducts();
    this.currentUser = this.authProvider.getCurrentUser();
    console.log('(UserProductsListPage.ts)(in refresher) user is not null: ' + this.currentUser.email);
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  addDocument() {
    let params: any =  {
      uid: this.currentUser.uid,
      collection: this.databaseCollection,
      isEdited: false
    }
    this.navCtrl.push("ManageProductPage", { record: params });
  }

}
