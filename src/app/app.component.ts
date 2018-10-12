import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { environment } from '../environment';
import firebase, { Unsubscribe } from 'firebase';
import { AuthProvider } from '../providers/auth/auth';
import { Storage } from '@ionic/storage';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  //Mostra a aba de perfil do usuário no menu
  public showUserTabInMenu: boolean = false;

  pages: Array<{ title: string, component: any }>;
  hiddenPages: Array<{ title: string, component: any }>;

  constructor(
    private storage: Storage,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authProvider: AuthProvider
  ) {

    firebase.initializeApp(environment.firebase);

    //Iniciar o aplicativo com o usuário atual
    const unsubscribe: Unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) { //Caso exista algum usuário autenticado, escrever código aqui
        this.storage.set('user', { uid: user.uid, email: user.email }).then((data) => {
          console.log("(app.component.ts) storage set uid: " + data.uid);
        });
        this.rootPage = 'HomePage';
        unsubscribe();
        console.log("(app.component.ts) entrei no if user, storage uid");
        console.log("(app.component.ts) usuário unsubscribe: " + user.uid);
        this.showUserTabInMenu = true;

      } else {  //Caso NÃO exista algum usuário autenticado, escrever código aqui
        this.storage.set('uid', '').then((data) => {
          console.log("(no user), uid: " + data);
        })

        console.log("(app.component.ts) entrei no else (no user)");
        this.rootPage = 'TutorialPage';
        unsubscribe();
        this.showUserTabInMenu = false;
        ///this.hideLogOutInMenu();
      }
    });


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Tutorial', component: 'TutorialPage' },
      { title: 'Test', component: 'TestPage' }
    ];


    this.hiddenPages = [
      { title: 'Minha conta', component: 'UserProfilePage' },
    ];


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

/**
 * 
 * @param page - Page para a qual se deseja settar a raiz, geralmente será uma page de this.pages
 * e neste caso, deverá ter seu valor dado pelo page.component de uma das this.pages (uma string)
 * @param params - Parâmetro para próxima página, será passado da forma {params: params}, geralmente
 * será uma string com o valor da categoria da página (ex.: Roupas, Calçados, etc)
 */
  openPage(page: any, params?: any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (params) {
      this.nav.setRoot(page, {params: params});
    }
    else{
      this.nav.setRoot(page);
    }
 
  }

  //teste
  openCategories() {
    this.openPage('CategoryPage', {category: 'Roupas'});
  }

  goToSigninPage() {
    this.nav.setRoot('SigninPage');
  }

  logOut(): void {
    console.log("entrei funçao logOut");
    this.storage.remove('user').then((user) => {
      console.log("(logout) user removed from storage, user: " + user);
    });
    this.authProvider.logoutUser().then(() => {
      this.showUserTabInMenu = false;
      this.nav.setRoot('SigninPage');
    });

  }



}
