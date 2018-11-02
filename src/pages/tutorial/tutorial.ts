import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,} from 'ionic-angular';









@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})

export class TutorialPage {
  
  showSkip = true;
  
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, ) {
    

    
}
startApp() {
  
  this.navCtrl.setRoot('SigninPage', {}, {animate: true, direction: 'forward'});
  console.log('cliquei no startapp');

}




ionViewDidLoad() {                                                //da um hide no menu enquanto tiver no tutorial
    console.log('ionViewDidLoad TutorialPage');

    this.menuCtrl.enable(false);
    }

    
onSlideChangeStart(slider) {                                //starta o slide
    this.showSkip = !slider.isEnd();
  }
  
  
  
  

}
