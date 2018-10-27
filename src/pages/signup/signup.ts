import { Component } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  MenuController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { DatabaseProvider } from '../../providers/database/database';
import { MyApp } from '../../app/app.component'; // Usado para mostrar as opções de usuário no side menu
import { Storage } from '@ionic/storage';
// import { User } from 'firebase';



@IonicPage()
@Component({

  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  public signupForm: FormGroup;
  private _collection: string = "UserProfiles";

  constructor(
    private storage: Storage,

    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public databaseProvider: DatabaseProvider,
    public menuCtrl: MenuController,
    public myApp: MyApp,
    formBuilder: FormBuilder) {

    this.menuCtrl.enable(false);

    this.signupForm = formBuilder.group({
      name: ['', Validators.required],
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],

      password: [
        '',
        Validators.compose([Validators.required])
      ],
      rePassword: ['', Validators.compose([Validators.required])]

    }, { validator: SignupPage.passwordsMatch },


    );


  }
  static passwordsMatch(cg: FormGroup): { [error: string]: any } {
    let password = cg.get('password');
    let rePassword = cg.get('rePassword');
    let rv: { [error: string]: any } = {};
    if ((password.touched || rePassword.touched) && password.value !== rePassword.value) {
      rv['passwordMismatch'] = true;
    }

    return rv;
  }



  signupUser(): void {
    if (!this.signupForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.signupForm.value}`
      );
    } else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();

      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      this.authProvider.signupUser(
        email,
        password
      )
        .then((data) => { //then do auth
          
          let uid = data.user.uid;
          let email = data.user.email;
          let name = this.signupForm.value.name;

          this.storage.set(
            'user',
            {uid: uid, email: email}
            );

          //define que é para mostrar as opções de usuário no menu
          this.myApp.showUserTabInMenu = true;

          this.databaseProvider.addUser(this._collection,
            {
              uid: uid,
              name: name,
              email: email
            }).then(() => { //then do firestore
              loading.dismiss();
              this.navCtrl.setRoot('HomePage');
            })
            .catch((error) => {//erro do firestore
              loading.dismiss();
              const alert: Alert = this.alertCtrl.create({
                message: error.message,
                buttons: [{ text: 'Ok', role: 'cancel' }]
              });
              alert.present();
            });

        })
        .catch((error) => { //erro do auth
          loading.dismiss();
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          alert.present();
        });
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  goToLogin() {
    this.navCtrl.setRoot('SigninPage' ,{}, {animate: true, direction: 'forward'});
  }

}
