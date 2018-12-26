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
  ptDetails: any;
  lastClicked: any;
  category: any;
  typeAs: any;
  type: any;
  bootcampPlan: any =[];
  ptPlan: any =[];
  priceCategory = [ {
    moduleName : "Bootcamp Plans", 
  },{
    moduleName : "Personal Training Plans", 
  }
];
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private loadingCtrl: LoadingController,
             private authService: AuthServiceProvider, private alertCtrl: AlertController) {      
  console.log('cons')              
              this.openPricing();  
  }

  ionViewDidEnter(){
    console.log('did') 
    if(this.authService.pageReset)
    {
      console.log(this.lastClicked);
      this.getProducts(this.lastClicked);
    }
  }
  getProducts(c: any)
  {
    
    this.lastClicked = c;
    this.category=c.moduleName;
    console.log(this.category);
    if(this.category=='Bootcamp Plans')
    {
      
     this.bootcampPlan =  this.priceDetails;
      console.log(this.bootcampPlan);
      this.type = "bootcamp";
    }
    else if(this.category=='Personal Training Plans'){
     
      this.ptPlan = this.ptDetails;
      console.log(this.ptPlan)
      this.type = "personalTraining";
    }
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
      const value1 = this.responseData.personal_training_product_details;
      this.priceDetails = value;
      this.ptDetails = value1;
      this.getProducts(this.priceCategory[0]);
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
