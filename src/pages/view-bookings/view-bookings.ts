import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-view-bookings',
  templateUrl: 'view-bookings.html',
})
export class ViewBookingsPage {
  bookings: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bookings = this.navParams.get('bookings');
    console.log(this.bookings);
  }

  

}
