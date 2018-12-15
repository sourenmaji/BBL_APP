import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { ForgetPasswordPage } from './../forget-password/forget-password';
import { RegistrationPage } from './../registration/registration';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashbordPage } from '../dashbord/dashbord';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  signinform: FormGroup;
  responseData : any;
  userData = {password: "", email: ""};
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public authService: AuthServiceProvider,
  public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ngOnInit() {
    let EMAILPATTERN =/^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|[0-9]{10}$/;
    this.signinform = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])

    });
  }
  // login(){
  //   this.navCtrl.push(DashbordPage);
  // }

  login(){
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    //console.log(JSON.stringify(this.userData))
    this.authService.postData(this.userData,'customer-login').then((result) => {
     this.responseData = result;

     if(this.responseData.status)
     {
       loader.dismiss();
     console.log(this.responseData);
     localStorage.setItem('userData', JSON.stringify(this.responseData));
     console.log("Local storage "+(localStorage.getItem('userData')));
     this.navCtrl.push(DashbordPage);
     }
     else{
      
        console.log(this.responseData.message);
        const alert = this.alertCtrl.create({
          title: 'Failure',
          subTitle: this.responseData.message,
          buttons: ['OK']
        })
        alert.present();
        loader.dismiss();
      }
   }, (err) => {
    loader.dismiss();
    this.responseData = err;
    console.log(this.responseData)
    const alert = this.alertCtrl.create({
      title: 'Failure',
      subTitle: JSON.stringify(this.responseData),
      buttons: ['OK']
    })
    alert.present();
   });

 }


  register(){
    //Register page link
    this.navCtrl.push(RegistrationPage);
  }
  forgetPassword(){
    //Register page link
    this.navCtrl.push(ForgetPasswordPage);
  }
}
