import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-testimonials',
  templateUrl: 'testimonials.html',
})
export class TestimonialsPage {
  responseData: any;
  testimonialsDetails: any;
  limit: number = 100;
  truncating: boolean = true;
  imageUrl: string ='';
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public loadingCtrl: LoadingController,
              private authService: AuthServiceProvider, private alertCtrl: AlertController) {
                this.imageUrl = this.authService.imageUrl;
  }
  ionViewWillEnter(){
    this.openTestimonials();
  }
  openTestimonials(){
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.authService.getDataWithoutToken('testimonial').then((result) => {
      loader.dismiss();
      this.responseData = result;

      if(this.responseData.status == true)
      {
      console.log(this.responseData.testimonials);

      const value = this.responseData.testimonials;
      this.testimonialsDetails = value;

      }
      else{
       const alert = this.alertCtrl.create({
        title: 'Failure',
         subTitle: this.responseData.message,
         buttons: ['OK']
       })
       alert.present();
       this.testimonialsDetails = [];
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
  onOpenMenu(){
    this.menuCtrl.open();
    }
    
}
