import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { environment } from '../environment';
import firebase, { Unsubscribe } from 'firebase';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
  
    firebase.initializeApp(environment.firebase);

    //Iniciar o aplicativo com o usuário atual
    const unsubscribe: Unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) { //Caso exista algum usuário autenticado, escrever código aqui
        this.rootPage = 'HomePage';
        unsubscribe();
        console.log("(app.component.ts) entrei no if user");
        console.log("(app.component.ts) usuário unsubscribe: " + user.email);
        //this.showLogOutInMenu();
      } else {  //Caso NÃO exista algum usuário autenticado, escrever código aqui
        console.log("(app.component.ts) entrei no else (no user)");
        this.rootPage = 'TutorialPage';
        unsubscribe();
        ///this.hideLogOutInMenu();
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Tutorial', component: 'TutorialPage'},
      //{ title: 'SignIn', component: 'SigninPage'}
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
