import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GdprPage } from './gdpr';

@NgModule({
  declarations: [
    GdprPage,
  ],
  imports: [
    IonicPageModule.forChild(GdprPage),
  ],
})
export class GdprPageModule {}
