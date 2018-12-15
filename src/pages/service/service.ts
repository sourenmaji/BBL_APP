import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
})
export class ServicePage {
  limit: number = 100;
  truncating: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicePage');
  }
  services = [
    {
      serviceName: 'GYM SERVICES',
      date:'December 15,2017',
      description:"Our advanced gym facilities come with the best equipment’s and trainers. Our fitness trainers will provide you with the latest fitness trends and methods to keep your body fit and healthy. You can use our state of art world class gym at any time of your convenience",
      img:"assets/imgs/1_service.jpg"
    },
    {
      serviceName: 'PERSONALIZED TRAINERS',
      date:'December 25,2017',
      description:"We provide personalized trainers for advising and guiding you on the best exercises and dietary regime to keep your body fit. Personal attention given by our experienced trainers will go a long way in giving you the fitness you always wanted. Your trainer can also provide you training at home at your convenient time.",
      img:"assets/imgs/2_service.jpg"
    },
    {
      serviceName: 'DIET PLANS',
      date:'December 15,2017',
      description:"Body by Lekan provides dietary plans, charts and modules to help you eat healthy and keep your body fit. Daily food charts, dietary plans to help you to reduce weight, suggestions to include proteins and nutrients to make the body strong are some of the other factors covered in the diet plans provided to our customers.",
      img:"assets/imgs/3_service.jpg"
    },
    {
      serviceName: 'HEALTH PACKAGES',
      date:'December 25,2017',
      description:"We provide a multitude of health packages to suit your need and budget. Customized health packages are also provided in consultation with our training experts to give your body the best. We accept bulk booking for institutions and corporates at discounted rates. Our registered customers will also enjoy the benefit of tracking their personal training calendar and diet charts online.",
      img:"assets/imgs/4_service.jpg"
    }
  ];

  onOpenMenu(){
    this.menuCtrl.open();
    }
}
