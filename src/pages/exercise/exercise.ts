import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import {  DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
})
export class ExercisePage {
  //text: string;
  responseData: any;
  exerciseDetails: any;
  limit: number = 100;
  truncating: boolean = true;
  imageUrl: string ='';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private authService: AuthServiceProvider, private loadingCtrl: LoadingController,
              private alertCtrl: AlertController, public sanitizer: DomSanitizer) {
 
    this.imageUrl= this.authService.imageUrl;
  }
  updateVideoUrl(id: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data, so
    // that it's easier to check if the value is safe.
    let dangerousVideoUrl = id + '?rel=0&showinfo=0';
    return this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercisePage');
  }
  onOpenMenu(){
    this.menuCtrl.open();
    }
    ionViewWillEnter(){
      this.openExercise();
    }
    openExercise(){
      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loader.present();
      this.authService.getDataWithoutToken('exercise').then((result) => {
        loader.dismiss();
        this.responseData = result;
  
        if(this.responseData.status == true)
        {
        console.log(this.responseData.exercises);
  
        const value = this.responseData.exercises;
        this.exerciseDetails = value;
  
        this.exerciseDetails.forEach(element => {
          element.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(element.video);
        });
        }
        else{
         const alert = this.alertCtrl.create({
          title: 'Failure',
           subTitle: this.responseData.message,
           buttons: ['OK']
         })
         alert.present();
         this.exerciseDetails = [];
         //this.no_data=true;
       }
      },
      (err) => {
        loader.dismiss();
       this.responseData = err.json();
       console.log(this.responseData)
      });
      this.menuCtrl.close();
    }
}
