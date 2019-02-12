import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExercisePage } from './exercise';
import { TruncateModule } from '@yellowspot/ng-truncate';

@NgModule({
  declarations: [
    ExercisePage,
  ],
  imports: [
    IonicPageModule.forChild(ExercisePage),
    TruncateModule
  ],
})
export class ExercisePageModule {}
