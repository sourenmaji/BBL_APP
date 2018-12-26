import { Facebook , FacebookLoginResponse} from '@ionic-native/facebook';
import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { ForgetPasswordPage } from './../forget-password/forget-password';
import { RegistrationPage } from './../registration/registration';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashbordPage } from '../dashbord/dashbord';
import { GooglePlus } from '@ionic-native/google-plus';
import {  HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  signinform: FormGroup;
  responseData : any;
  userData = {password: "123456", email: "bbl18uk@gmail.com"};
  googleData: any;
  facebookData: any;
  registervalue : any;
  goData: any;
  email: any;
  providerId: any;
  name: any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public authService: AuthServiceProvider,
  public alertCtrl: AlertController, private facebook: Facebook, public googlePlus: GooglePlus, public http: HttpClient) {
  }
  loginWithGoogle(){
    this.googlePlus.login({})
  .then(res => {
    
    //alert(JSON.stringify(res));
    this.goData = JSON.parse(JSON.stringify(res));
     this.googleData={provider_id: this.goData.userId, email: this.goData.email, name: this.goData.displayName,provider_name: "google"}
    
   // alert(JSON.stringify(this.googleData));
    this.authService.postData(this.googleData,'social_auth').then((result: any) => {
      
      this.responseData = result; 
      if(this.responseData.status)
      {
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.push(DashbordPage);
      }
      else{ 
        
        this.registervalue = this.responseData.user;
       
        this.navCtrl.push(RegistrationPage,{registervalue:  this.registervalue});
       
      }
    }, (err) => {
      this.responseData = err.json();
      console.log(this.responseData)
      const alert = this.alertCtrl.create({
        subTitle: this.responseData.success.error,
        buttons: ['OK']
      })
      alert.present();
     });
  })
  .catch(err => {
    alert(err)
  });
  }

  loginWithFb(){
    
    this.facebook.login(['email','public_profile']).then((response: FacebookLoginResponse) =>{
    this.facebook.api('me?fields=id,name,email,first_name',[]).then(profile =>{
    this.facebookData ={provider_id: profile['id'],email: profile['email'],name : profile['name'],provider_name : 'facebook'};
    
     this.authService.postData(this.facebookData,'social_auth').then((result: any) => {
      
      this.responseData = result; 
      if(this.responseData.status)
      {
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.push(DashbordPage);
      }
      else{ 
        
        this.registervalue = this.responseData.user;
       
        this.navCtrl.push(RegistrationPage,{registervalue:  this.registervalue});
       
      }
    }, (err) => {
      this.responseData = err.json();
      console.log(this.responseData)
      const alert = this.alertCtrl.create({
        subTitle: this.responseData.success.error,
        buttons: ['OK']
      })
      alert.present();
     });
    })
    })
    .catch(e => alert(JSON.stringify(e)));
  }
  ngOnInit() {
    let EMAILPATTERN =/^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|[0-9]{10}$/;
    this.signinform = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])

    });
  }
  

  login(){
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
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
