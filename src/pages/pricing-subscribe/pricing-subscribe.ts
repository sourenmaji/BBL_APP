import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { PaymentsPage } from './../payments/payments';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-pricing-subscribe',
  templateUrl: 'pricing-subscribe.html',
})
export class PricingSubscribePage {
price: any;
userDetails: any;
responseData: any;
options: any;
couponValue: any;
discount: any;
discountedPrice: any;
isvisible: boolean = true;
browser: any;
userPostData = {"user":"","token":""};
data = {paymentOption: "",coupon: "",dom: "1"};
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthServiceProvider, 
    public alertCtrl: AlertController,
    private iab: InAppBrowser, 
    private platform: Platform) {
    this.price = this.navParams.get('price');
    console.log(this.price);
    const data = JSON.parse(localStorage.getItem('userData'));
              this.userDetails = data.user;
              console.log(this.userDetails);
              this.userPostData.user = this.userDetails;
              this.userPostData.token = data.token;  
              if(this.price.payment_type_name == "Subscription")   {
                this.data.paymentOption = "directDebit";
              }else{
                this.data.paymentOption = "onlinePayment";
              }
              this.discount = "no";
              
              // this.platform.ready().then( () => {
              // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PricingSubscribePage');
  }
  logForm(payOption: any){
    console.log(this.discount);
    if(this.discount == 'yes'){
      this.price.total_price = this.discountedPrice;
      //console.log(this.price);
    }
    if(payOption == "directDebit"){
      this.authService.authData({product_id: this.price.product_id,updated_price:this.discountedPrice},'bootcamp-plan-purchase',this.userPostData.token).then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if(this.responseData.status)
        {
          var url = this.responseData.url;
          // console.log(url);
          // this.browser = this.iab.create("url",'self',{
          //   zoom: "no"
          // });
          // this.browser.show();
          this.launch(url);
        }
        else{
         const alert = this.alertCtrl.create({
           subTitle: this.responseData.message,
           buttons: ['OK']
         })
         alert.present();
       }
      }, (err) => {
       this.responseData = err.json();
       console.log(this.responseData)
       const alert = this.alertCtrl.create({
         subTitle: this.responseData.error,
         buttons: ['OK']
       })
       alert.present();
      });

    }else{
      console.log(payOption);
      this.navCtrl.push(PaymentsPage,{options:  payOption, price: this.price});
    }
    
  }
  apply(coupon: any){
  console.log(coupon);
  this.authService.authData({coupon_code :coupon,package_id: this.price.product_id},'cus_couponsearch',this.userPostData.token).then((result) => {
    this.responseData = result;
    console.log(this.responseData);
    if(this.responseData.status)
    {
   this.couponValue = this.responseData;
   if(this.couponValue.flag == 1){
     var price = this.couponValue.new_package_price;
     this.discountedPrice = (this.price.total_price - price);
     console.log(this.discountedPrice);
     this.discount = "yes";
    

   }
   else{
    this.discount = "no";
   }
    const alert = this.alertCtrl.create({
     subTitle: this.responseData.message,
     buttons: ['OK']
   })
   alert.present();
    }
    else{
     const alert = this.alertCtrl.create({
       subTitle: this.responseData.message,
       buttons: ['OK']
     })
     alert.present();
   }
  }, (err) => {
   this.responseData = err.json();
   console.log(this.responseData)
   const alert = this.alertCtrl.create({
     subTitle: this.responseData.error,
     buttons: ['OK']
   })
   alert.present();
  });
  }
selectPaymentMethod(value: any){
var aa = value;
//console.log(aa);
if(aa == "bankTransfer"){
this.isvisible = false;
}else{
this.isvisible = true;
 }
}
launch(url:string){

  this.browser = this.iab.create(url,"_self","location=yes");
  
}
}
