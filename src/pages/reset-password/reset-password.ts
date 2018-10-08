import { Component } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';


@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  public resetPasswordForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    formBuilder: FormBuilder
  ) {
    this.resetPasswordForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });
  }

  resetPassword(): void {
    if (!this.resetPasswordForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.resetPasswordForm.value}`
      );
    } else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();

      const email = this.resetPasswordForm.value.email;


      this.authProvider.resetPassword(email).then(() => {
        loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: 'Por favor verifique seu email.',
          buttons: [
            { text: 'Cancel', role: 'cancel' },
            {
              text: 'Ok',
              handler: data => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      }).catch((error) => {
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
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
