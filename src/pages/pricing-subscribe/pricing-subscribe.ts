import { PaymentsPage } from './../payments/payments';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pricing-subscribe',
  templateUrl: 'pricing-subscribe.html',
})
export class PricingSubscribePage {
price: any;
userDetails: any;
options: any;
userPostData = {"user":"","token":""};
data = {paymentOption: ""};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.price = this.navParams.get('price');
    console.log(this.price);
    const data = JSON.parse(localStorage.getItem('userData'));
              this.userDetails = data.user;
              console.log(this.userDetails);
              this.userPostData.user = this.userDetails;
              this.userPostData.token = data.token;  
              if(this.price.payment_type_name == "Subscription")   {
                this.data.paymentOption = "bankTransfer";
              }else{
                this.data.paymentOption = "onlinePayment";
              }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PricingSubscribePage');
  }
  logForm(){
    
    this.options = this.data;
    console.log(this.options);
    this.navCtrl.push(PaymentsPage,{options:  this.options, price: this.price});
  }
}
