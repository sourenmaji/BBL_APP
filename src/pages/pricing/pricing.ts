import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { PricingSubscribePage } from '../pricing-subscribe/pricing-subscribe';

@IonicPage()
@Component({
  selector: 'page-pricing',
  templateUrl: 'pricing.html',
})
export class PricingPage {
  responseData: any;
  priceDetails: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private loadingCtrl: LoadingController,
             private authService: AuthServiceProvider, private alertCtrl: AlertController) {          
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PricingPage');
  }
  ionViewWillEnter(){
    this.openPricing();
  }
  openPricing(){
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.authService.getDataWithoutToken('pricing').then((result) => {
      loader.dismiss();
      this.responseData = result;

      if(this.responseData.status == true)
      {
      console.log(this.responseData.bootcamp_product_details);

      const value = this.responseData.bootcamp_product_details;
      this.priceDetails = value;

      }
      else{
       const alert = this.alertCtrl.create({
        title: 'Failure',
         subTitle: this.responseData.message,
         buttons: ['OK']
       })
       alert.present();
       this.priceDetails = [];
       //this.no_data=true;
     }
    },
    (err) => {
      loader.dismiss();
     this.responseData = err.json();
     console.log(this.responseData)
    });
    this.menuCtrl.close();
  }

  onOpenMenu(){
    this.menuCtrl.open();
    }
    subscribe(price){
      this.navCtrl.push(PricingSubscribePage,{price: price});
    }
}
