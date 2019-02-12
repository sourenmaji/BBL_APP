import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalTrainingBookingPage } from './personal-training-booking';

@NgModule({
  declarations: [
    PersonalTrainingBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalTrainingBookingPage),
  ],
})
export class PersonalTrainingBookingPageModule {}
