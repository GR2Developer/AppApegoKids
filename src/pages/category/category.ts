import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';
import Firebase from 'firebase';


/**
 * Quantidade de itens a serem renderizados a cada interaçao do inifinite scroll
 */
const ITEMSPERPAGE = 6;

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  private unsub: any;

  private infiniteScroll: any;
  categoryProducts: any[] = [];
  //Imagens sendo mostradas atualmente(atualizadas com o infinite scroll)
  currentDisplayedItems: any[] = [];
  //Controle de paginação do App
  private currentPage: number = 0;
  private pages: number = 0;
  private remainingItems: number = 0;

  private category: string;
  private subcategory: string;

  private categoryFilters: any = [];



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public databaseProvider: DatabaseProvider
  ) {

  }

  ionViewDidEnter() {
    this.resetPagesAndRemainItems();
    //this.addListenerOnCategoryProducts();
  }

  downloadCategoryProducts(): Promise<any> {
    return new Promise(resolve => {
      this.databaseProvider.getCategoryProducts(this.category).then(products => {
        this.categoryProducts = products;
        resolve();
      });
    });
  }

  resetPagesAndRemainItems() {
    this.downloadCategoryProducts().then(() => {
      this.pages = Math.floor(this.categoryProducts.length / ITEMSPERPAGE);
      this.remainingItems = this.categoryProducts.length % ITEMSPERPAGE;
      this.currentPage = 0;
      this.currentDisplayedItems = [];
      console.log("pages: " + this.pages);
      console.log("currentPage: " + this.currentPage);
      console.log("remainingItems: " + this.remainingItems);
      this.loadPage();
    });
  }




  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    // console.dir(infiniteScroll);
    //Se ainda não cheguei a página final
    if (this.currentPage < this.pages) {
      setTimeout(() => {
        this.loadPage();

        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 500);
    }
    else {
      setTimeout(() => {
        this.loadPage();

        console.log('disabe Infinite Async operation has ended');
        infiniteScroll.complete();
        infiniteScroll.enable(false);
      }, 500);

    }
  }

  doRefresh(refresher) {
    console.log('Begin refresh async operation', refresher);
    this.resetPagesAndRemainItems();
    if (this.infiniteScroll)
      this.infiniteScroll.enable(true);
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  loadPage() {
    if (this.currentPage < this.pages) {
      console.log("curerntPage: " + this.currentPage);
      let myItems: any[] = this.categoryProducts.slice(this.currentPage * ITEMSPERPAGE, (this.currentPage + 1) * ITEMSPERPAGE);
      console.log("myitems: ");
      console.dir(myItems);
      myItems.forEach(element => {
        this.currentDisplayedItems.push(element);
      });
      //this.currentDisplayedItems.concat(a);
      console.log("currentDispItems: ");
      console.dir(this.currentDisplayedItems);
      console.log("imageUrls: ");
      console.dir(this.categoryProducts);
      this.currentPage++;
      console.log("curerntPage: " + this.currentPage);
    }
    else { //Estou na página final
      let myItems: any[] = this.categoryProducts.slice(this.currentPage * ITEMSPERPAGE, this.categoryProducts.length);
      console.log('myItems2: ');
      console.dir(myItems);
      myItems.forEach(element => {
        this.currentDisplayedItems.push(element);
      });
    }

  }


  testFunc() {
    console.log("testeFunc");
  }



  ionViewCanEnter(): boolean {
    // here we can either return true or false
    // depending on if we want to leave this view
    let params = this.navParams.get('params');
    this.category = params.category;
    this.subcategory = params.subcategory;
    console.log("viewcanenter: ",this.category,", ",this.subcategory);

    if (this.category != null) {
      return true;
    }


  }

  /*
    addListenerOnCategoryProducts(): any {
      this.unsub = Firebase.firestore().collection('Products')
        .where('category', '==', this.category).onSnapshot(querySnapshot => {
          this.categoryProducts = [];
          querySnapshot.forEach(doc => {
            console.log("doc database");
            console.dir(doc.data());
            this.categoryProducts.push({
              //docId: doc.id, dúvida 
              name: doc.data().name,
              description: doc.data().description,
              price: doc.data().price,
              category: doc.data().category,
              subcategory: doc.data().subcategory,
              imgUrl: doc.data().imgUrl,
              imgPath: doc.data().imgPath
            });
          });
        })
    }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  goToHome() {
    this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'forward' });
    console.log('cliquei nessa poha');
  }




}
