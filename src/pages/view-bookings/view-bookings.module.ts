import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewBookingsPage } from './view-bookings';

@NgModule({
  declarations: [
    ViewBookingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewBookingsPage),
  ],
})
export class ViewBookingsPageModule {}
