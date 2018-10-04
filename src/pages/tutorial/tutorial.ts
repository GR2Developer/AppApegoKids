import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,} from 'ionic-angular';
import { HomePage } from '../home/home';




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
          title: "Bem-vindo ao Apego kids ",
          description: "Aqui você encontra todos e qualquer produtos para o uso de suas crianças",
          image: 'assets/img/slide1.png',
        },
        {
          title:"Quer começar a usar o aplicativo?",
          description: "Basta navegar no menu, escolher a categoria desejada e começar a checar os inúmeros produtos e suas ofertas sempre com o melhor preço!",
          image: 'assets/img/slide2.png',
        },
        {
          title: "Viu como é simples? ",
          description:"Agora você já pode começar com o uso do aplicativo, caso ainda haja dúvidas entre na sessão...",
          image: 'assets/img/slide3.png',
        }
      ];
    
}
startApp() {
  this.navCtrl.setRoot(HomePage);
}




ionViewDidLoad() {                                                //da um hide no menu enquanto tiver no tutorial
    console.log('ionViewDidLoad TutorialPage');

    this.menuCtrl.enable(false);
    }

    
onSlideChangeStart(slider) {                                //starta o slide
    this.showSkip = !slider.isEnd();
  }
  
  
  
  

}
