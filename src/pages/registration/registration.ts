import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage implements OnInit{
  signupform: FormGroup;
  userData = { name: "",email: "",password: "",password_confirmation: "",ph_no: ""};
  responseData : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
             public authService: AuthServiceProvider, public alertCtrl: AlertController ) {
  }

  ngOnInit() {
    let EMAILPATTERN =/^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|[0-9]{10}$/;
    let MOBILEPATTERN =/^[0-9]+$/;
    this.signupform = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      ph_no: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern(MOBILEPATTERN)]),
      // gender: new FormControl('', Validators.compose([])),
      password_confirmation: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), this.equalto('password')]))
    });
  }


    equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

    let input = control.value;

    let isValid=control.root.value[field_name]==input
    if(!isValid)
    return { 'equalTo': {isValid} }
    else
    return null;
    };
    }

    register(){
      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loader.present();
       this.authService.postData(this.userData,'customer-registration')
       .then((result) => {
        this.responseData = result;
  console.log(this.responseData);
        if(this.responseData.status)
        {
          loader.dismiss();
        console.log("Response data "+this.responseData);
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        console.log("Local storage "+JSON.parse(localStorage.getItem('userData')));
        const alert = this.alertCtrl.create({
          title: 'Success',
        subTitle: this.responseData.message,
          buttons: ['OK']
        })
        alert.present();
        this.navCtrl.push(LoginPage);
        }
        else{ 
          const alert = this.alertCtrl.create({
            title: 'Failure',
          subTitle: this.responseData.message,
            buttons: ['OK']
          })
          alert.present();
          loader.dismiss(); }
      },
      (err) => {
        loader.dismiss();
        this.responseData = err.json();
        console.log(this.responseData.error)
        const alert = this.alertCtrl.create({
          subTitle: this.responseData.error,
          buttons: ['OK']
        })
        alert.present();
      });
  
    }

    login(){
      //Register page link
      this.navCtrl.push(LoginPage);
    }
}
