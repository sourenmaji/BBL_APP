import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PricingSubscribePage } from './pricing-subscribe';

@NgModule({
  declarations: [
    PricingSubscribePage,
  ],
  imports: [
    IonicPageModule.forChild(PricingSubscribePage),
  ],
})
export class PricingSubscribePageModule {}
