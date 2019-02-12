import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, Platform, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/authservice';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  
  forgetpasswordform: FormGroup;
  userDetails : any;
  responseData: any;
  flag: any;
  // newU = {"success": {"token":"","user":""}};
  userPostData = {"user":"","token":""};
  userPassword = {"password":"","new_password_confirmation":"","new_password":""};
  changePasswordFlag : boolean = true;
  ngOnInit() {

    this.forgetpasswordform = new FormGroup({
      // username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])),
      new_password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])),
      new_password_confirmation: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), this.equalto('new_password')]))
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

  constructor(public navCtrl: NavController, public authService:AuthServiceProvider,
               public alertCtrl: AlertController, private menuCtrl: MenuController, public platform: Platform, public navParams: NavParams)
  {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.user;
    this.flag = this.navParams.get('changePasswordFlag');
    if (this.flag != null){
      this.changePasswordFlag = this.flag;
    }else{
      this.changePasswordFlag = true
    }
    console.log(this.changePasswordFlag);
    this.userPostData.user = this.userDetails;
    this.userPostData.token = data.token;
    console.log(this.userPostData.token);
    console.log( this.userPostData.user);
    let backAction =  platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      backAction();
    },2)
  }

change_password(){
  this.authService.authData(this.userPassword,'customer-changepassword',this.userPostData.token).then((result) => {
   this.responseData = result;
   if(this.responseData.status)
   {
  
   const alert = this.alertCtrl.create({
    subTitle: this.responseData.message,
    buttons: ['OK']
  })
  alert.present();
  localStorage.clear();
  setTimeout(() => this.navCtrl.setRoot(LoginPage), 1000);
   }
   else{
    const alert = this.alertCtrl.create({
      subTitle: this.responseData.message,
      buttons: ['OK']
    })
    alert.present();
  }
 }, (err) => {
  this.responseData = err.json();
  console.log(this.responseData)
  const alert = this.alertCtrl.create({
    subTitle: this.responseData.error,
    buttons: ['OK']
  })
  alert.present();
 });
}
onOpenMenu(){
this.menuCtrl.open();
}

// onLogout()
// {
//   localStorage.clear();
//   setTimeout(() => this.navCtrl.setRoot(WelcomePage), 1000);
// }
}
