import { Component } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {
  public signupForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    formBuilder: FormBuilder
  ) {
    
    this.signupForm = formBuilder.group({
      name: [ '',Validators.required],  
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      
      password: [
        '',
        Validators.compose([Validators.required])
      ],
      rePassword: [ '', Validators.compose([Validators.required])]
      
    }, {validator: SignupPage.passwordsMatch }, 
    
    
    ); 
    
    
  }
  static passwordsMatch(cg: FormGroup): {[error: string] : any} {
    let password = cg.get('password');
    let rePassword = cg.get('rePassword');
    let rv: {[error: string]: any} = {};
    if ((password.touched || rePassword.touched) && password.value !== rePassword.value) {
      rv['passwordMismatch'] = true;
    }
   
    return rv;
  }

  

  async signupUser(): Promise<void> {
    if (!this.signupForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.signupForm.value}`
      );
    } else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();

      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      try {
        await this.authProvider.signupUser(
          email,
          password
        );
        await loading.dismiss();
        this.navCtrl.setRoot('HomePage');
      } catch (error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        alert.present();
      }
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  Signup() {
    this.navCtrl.setRoot('HomePage');
  }

}
