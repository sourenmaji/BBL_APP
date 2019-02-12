import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicePage } from './service';
import { TruncateModule } from '@yellowspot/ng-truncate';

@NgModule({
  declarations: [
    ServicePage,
  ],
  imports: [
    IonicPageModule.forChild(ServicePage),
    TruncateModule
  ],
})
export class ServicePageModule {}
