import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController
} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-manage-product',
  templateUrl: 'manage-product.html',
})
export class ManageProductPage {

  private databaseCollection: string = "Products";  //Collection no firestore

  public form: any;
  public isEditable: boolean = false;
  public title: string = 'Adicionar novo produto';

  //variáveis do produto e o uid do usuário que vai publicar/editar o produto
  public uid: string = '';
  public name: string = '';
  public description: string = '';
  public price: string = '';
  public docId: string = '';
  //-------------------------------------------------------------//



  constructor(
    private storage: Storage,

    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private databaseProvider: DatabaseProvider,
    private alertController: AlertController,
    public loadingCtrl: LoadingController
  ) {

    this.form = formBuilder.group({
      'name': [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20)])
      ],
      'description': ['',
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ],
      'price': ['', Validators.required]
    });

    if (this.navParams.get('isEdited')) {
      //Pegando o uid do storage
      this.storage.get('user').then((data) => {
        this.uid = data.uid;
      });

      let record = navParams.get('record');
      this.name = record.product.name;
      this.description = record.product.description;
      this.price = record.product.price;
      this.docId = record.product.docId;
      this.isEditable = true;
      this.title = 'Atualizar produto';
    }
    else {
      //Pegando o uid do storage
      this.storage.get('user').then((data) => {
        this.uid = data.uid;
      });
      //this.databaseCollection = navParams.get('collection');
      console.log("(manage-products) user uid: " + this.uid);
      console.log("(manage-products) dbCollection: " + this.databaseCollection);

      this.isEditable = false;

    }

  }

  saveDocument(val: any): void {
    //Adiciona um loading na tela para bloquear interação do usuário
    const loading: Loading = this.loadingCtrl.create();
    loading.present();
    console.log("Entered saveDocument");
    let name: string = this.form.controls["name"].value,
      //ab: string = this.form.value.description,
      description: string = this.form.controls["description"].value,
      price: string = this.form.controls["price"].value,
      uid: string = this.uid;

    if (this.isEditable) {

      this.databaseProvider.updateDocument(this.databaseCollection,
        this.docId,
        {
          name: name,
          description: description,
          price: price
        })
        .then(() => {
          this.clearForm();
          this.displayAlert('Feito!', 'O produto ' + name + ' foi atualizado com sucesso');
        })
        .catch((error) => {
          this.displayAlert('Updating document failed', error.message);
        });

    }


    else {//Usuário está cadastrando um produto, adicionar as flags de visibilidade (hot, promoção, etc.)

      console.log("nome do formulário: " + name);
      console.log("price do formulário: " + price);
      console.log("uid do formulário: " + uid);
      console.log("description do formulário: " + description);
      this.databaseProvider.addDocument(this.databaseCollection,
        {
          name: name,
          description: description,
          price: price,
          uid: uid,
          flagHot: false

        })
        .then((data) => {
          this.clearForm();
          this.displayAlert('Feito!', 'O produto ' + name + ' foi adicionado com sucesso.');
        })
        .catch((error) => {
          this.displayAlert('Adicionar produto falhou', error.message);
        });
    }

    loading.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageProductPage');
  }

  displayAlert(title: string,
    message: string): void {
    let alert: any = this.alertController.create({
      title: title,
      subTitle: message,
      buttons: ['OK!']
    });
    alert.present();
  }


  clearForm(): void {
    this.name = '';
    this.description = '';
    this.price = '';
  }

}
