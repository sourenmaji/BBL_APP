import { BootcampSessionPage } from './../bootcamp-session/bootcamp-session';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage {
order_ref_id : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.order_ref_id = this.navParams.get('order_ref_id');
  }

  onOpenMenu(){
    this.menuCtrl.open();
  }
  openBootcampSession(){
    this.navCtrl.push(BootcampSessionPage);
  }
}
