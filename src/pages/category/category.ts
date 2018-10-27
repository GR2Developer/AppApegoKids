import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  /** */
  public category: string;
  public categoryFilters: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public databaseProvider: DatabaseProvider
  ) {

  }

  ionViewCanEnter(): boolean {
    // here we can either return true or false
    // depending on if we want to leave this view
    let params = this.navParams.get('params');
    this.category =params.category;
    //console.log(params.category);
    this.databaseProvider.getCategoryData(this.category).
    then((data) =>{
      this.categoryFilters = data;
      console.log("category data retornardo: ");
      console.dir(this.categoryFilters);
    }).
    catch((error) => {
      console.log(error.message);
    });

    if(this.category != null){
      return true;
    }


    //return true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  goToHome(){
    this.navCtrl.setRoot('HomePage' ,{}, {animate: true, direction: 'forward'});
    console.log('cliquei nessa poha');
  }




}
