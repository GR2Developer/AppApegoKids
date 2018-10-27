import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,} from 'ionic-angular';





export interface Slide {    //Exportando a interface onde ficam os slides
  title: string;
  description: string;
  image: string;
}



@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})

export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';
 
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, ) {
    
    this.slides = [                                                             //estrutura dos slides
      {
        title: "",
        description: "",
        image: 'assets/img/vagao1.png',
      },
      {
        title:"",
        description: "",
        image: 'assets/img/vagao2.png',
      },
      {
        title: "",
        description:"",
        image: 'assets/img/vagao3.png',
      }
    ];
    
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
