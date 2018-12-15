import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-viewbootcamp-purchase',
  templateUrl: 'viewbootcamp-purchase.html',
})
export class ViewbootcampPurchasePage {
  purchase: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.purchase = this.navParams.get('purchase');
    console.log(this.purchase);
  }

}
