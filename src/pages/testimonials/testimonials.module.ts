import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestimonialsPage } from './testimonials';
import { TruncateModule } from '@yellowspot/ng-truncate';

@NgModule({
  declarations: [
    TestimonialsPage,
  ],
  imports: [
    IonicPageModule.forChild(TestimonialsPage),
    TruncateModule
  ],
})
export class TestimonialsPageModule {}
