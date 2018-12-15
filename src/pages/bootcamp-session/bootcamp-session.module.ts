import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BootcampSessionPage } from './bootcamp-session';

@NgModule({
  declarations: [
    BootcampSessionPage,
  ],
  imports: [
    IonicPageModule.forChild(BootcampSessionPage),
  ],
})
export class BootcampSessionPageModule {}
