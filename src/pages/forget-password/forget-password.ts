import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage implements OnInit{
  forgetPasswordform: FormGroup;
  responseData : any;
  userData = {"email": ""};
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public authService: AuthServiceProvider,
             public alertCtrl: AlertController) {
  }

  ngOnInit() {
    let EMAILPATTERN = /^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|[0-9]{10}$/;
    this.forgetPasswordform = new FormGroup({
      // username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
    });
  }

  forgetPassword(){
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.authService.postData(this.userData,'forgot_password').then((result: any) => {
      this.responseData = result;
      if(result.status)
      {
        loader.dismiss();
       
      console.log(this.responseData);
      
      const alert = this.alertCtrl.create({
       subTitle: this.responseData.message,
       buttons: ['OK']
       
     })
     alert.present();
      }
      else{loader.dismiss();
        const alert = this.alertCtrl.create({
          subTitle: this.responseData.message,
          buttons: ['OK']
          
        })
        alert.present();
       }
    }, (err) => {
      loader.dismiss();
     this.responseData = err.json();
     console.log(this.responseData)
     const alert = this.alertCtrl.create({
       subTitle: this.responseData.message,
       buttons: ['OK']
     })
     alert.present();
    });
  }
}
