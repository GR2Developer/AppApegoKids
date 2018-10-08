import { Component } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
  MenuController
} from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  public signinForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public menuCtrl: MenuController,
    public myApp: MyApp,
    formBuilder: FormBuilder
  ) {
    this.menuCtrl.enable(false);
    this.signinForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  //Loga o usuário com base no email e password,
  //Obs.: olhar no auth provider o ref() onde os usuários estão cadastrados
  //Obs.: antes, a linha abaixo estava: 'async loginUser(): Promise<void> {'
  loginUser(): void {
    if (!this.signinForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.signinForm.value}`
      );
    }
    else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();

      const email = this.signinForm.value.email;
      const password = this.signinForm.value.password;

      this.authProvider.loginUser(
        email,
        password
      )
        .then(() => {
          loading.dismiss();
          this.myApp.showUserTabInMenu = true;
          this.navCtrl.setRoot('HomePage');
          
        })
        .catch((error) => {
          loading.dismiss();
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          alert.present();
        });

    }
  }

  goToSignup() {
    this.navCtrl.setRoot('SignupPage');
    
  }

  goToResetPassword() {
    this.navCtrl.push('ResetPasswordPage');
  }
}
