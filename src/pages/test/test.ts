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

    /**Criar collections de categorias e adicionar documentos, falta Roupas*/
    /*
    this.databaseProvider.addDocument('Categories', { category: 'Brinquedos' }, 'Brinquedos').then(() => {
      console.log("categoria adicionada");
    });

    this.databaseProvider.addDocument('Categories', { category: 'Decoração' }, 'Decoração').then(() => {
      console.log("categoria adicionada");
    });
    this.databaseProvider.addDocument('Categories', { category: 'Banho' }, 'Banho').then(() => {
      console.log("categoria adicionada");
    });
    this.databaseProvider.addDocument('Categories', { category: 'Higiene' }, 'Higiene').then(() => {
      console.log("categoria adicionada");
    });
    this.databaseProvider.addDocument('Categories', { category: 'Acessórios' }, 'Acessórios').then(() => {
      console.log("categoria adicionada");
    });
    this.databaseProvider.addDocument('Categories', { category: 'Perfumaria' }, 'Perfumaria').then(() => {
      console.log("categoria adicionada");
    });
    this.databaseProvider.addDocument('Categories', { category: 'Calçados' }, 'Calçados').then(() => {
      console.log("categoria adicionada");
    });*/


    /**Update collections de categorias e adicionar chaves nos documentos */
    /*
    this.databaseProvider.updateDocument(
      'Categories',
      'Roupas',
      { subcategories: ['body', 'calça', 'blusa', 'conjunto'] }
    )
      .then(() => {
        console.log("categoria adicionada");
      });
    this.databaseProvider.updateDocument(
      'Categories',
      'Brinquedos',
      { subcategories: ['carrinhos', 'barbie', 'marvel', 'brinquedos educativos'] }
    )
      .then(() => {
        console.log("categoria adicionada");
      });
    this.databaseProvider.updateDocument(
      'Categories',
      'Decoração',
      { subcategories: ['cortinas', 'papel de parede', 'adesivos'] }
    )
      .then(() => {
        console.log("categoria adicionada");
      });
    this.databaseProvider.updateDocument(
      'Categories',
      'Banho',
      { subcategories: ['shampoo', 'sabonete', 'condicionador', 'banheira'] }
    )
      .then(() => {
        console.log("categoria adicionada");
      });
    this.databaseProvider.updateDocument(
      'Categories',
      'Higiene',
      { subcategories: ['escova de dentes', 'pasta de dente', 'lenço umedecido'] }
    )
      .then(() => {
        console.log("categoria adicionada");
      });
    this.databaseProvider.updateDocument(
      'Categories',
      'Acessórios',
      { subcategories: ['carrinho de bebê', 'bijouterias', 'bebê conforto', 'canguru'] }
    )
      .then(() => {
        console.log("categoria adicionada");
      });
    this.databaseProvider.updateDocument(
      'Categories',
      'Perfumaria',
      { subcategories: ['perfume', 'loção', 'hidratante', 'água de cheiro'] }
    )
      .then(() => {
        console.log("categoria adicionada");
      });
    this.databaseProvider.updateDocument(
      'Categories',
      'Calçados',
      { subcategories: ['botas', 'sandálias', 'meias', 'all-star'] }
    )
      .then(() => {
        console.log("categoria adicionada");
      });*/




  }

  logOut(): void {
    console.log("entrei funçao logOut");
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('SigninPage');
    });

  }


}
