import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { environment } from '../environment';
import firebase, { Unsubscribe } from 'firebase';
import { AuthProvider } from '../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { timer } from 'rxjs/observable/timer';
import { DatabaseProvider } from '../providers/database/database';

import { DataServiceProvider } from '../providers/data-service/data-service';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  showSplash = true;
  rootPage: any;
  //private databaseProvider: DatabaseProvider;
  //Mostra a aba de perfil do usuário no menu
  public showUserTabInMenu: boolean = false;
  
  public categories: any[] = [];
  showSubmenu: boolean = false;
  showSubmenu2: boolean = false;

  pages: any;
  hiddenPages: Array<{ title: string, component: any }>;
  showLevel1 = null;
  showLevel2 = null;
  

  constructor(
    private storage: Storage,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authProvider: AuthProvider,
    private databaseProvider: DatabaseProvider,
    public dataService: DataServiceProvider

  ) {

    firebase.initializeApp(environment.firebase);

    this.dataService.getMenus()
    .subscribe((response)=> {
        this.pages = response;
        console.log(this.pages);
    });

    //Iniciar o aplicativo com o usuário atual
    const unsubscribe: Unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) { //Caso exista algum usuário autenticado, escrever código aqui
        // this.storage.set('user', { uid: user.uid, email: user.email }).then((data) => {
        //   console.log("(app.component.ts) storage set uid: " + data.uid);
        // });
        this.rootPage = 'HomePage';
        unsubscribe();
        console.log("(app.component.ts) entrei no if user, storage uid");
        console.log("(app.component.ts) usuário unsubscribe: " + user.uid);
        this.showUserTabInMenu = true;

      } else {  //Caso NÃO exista algum usuário autenticado, escrever código aqui
        // this.storage.set('uid', '').then((data) => {
        //   console.log("(no user), uid: " + data);
        // })

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


    this.getCategories();



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      

      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
    });

  }


  openSubCatMenu(category){

  }

  getCategories() {
    this.databaseProvider.getCategoryData().then((categories: any[]) => {
      categories.forEach(element => {
        this.categories.push(
          {
            category: element.category,
            subcategories: element.subcategories
          }
        );
      });
      console.log('this.categories: ', this.categories.join(', '));
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
      this.nav.setRoot(page, { params: params });
    }
    else {
      this.nav.setRoot(page);
    }

  }

  //teste
  openCategoryPage(category: string, subcategory: string) {
    this.openPage('CategoryPage', { category: category, subcategory: subcategory });
  }

  goToSigninPage() {
    this.nav.setRoot('SigninPage');
  }

  goToHomePage(){
    this.nav.setRoot('HomePage');
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

  testFunc(val1:string,val2:string){
    console.log("testeFunccccc");
    console.log(val1,", ",val2);
  }

 
  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };
  
  toggleLevel2(idx) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };
  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };
  
  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  };
  goToCategoryPage() {
    this.openPage("CategoryPage")
  }


}
