import { DashbordPage } from './../dashbord/dashbord';
import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-gdpr',
  templateUrl: 'gdpr.html',
})
export class GdprPage {
  signupform: FormGroup;
  userData = {customer_communication: "0",email_communication: "0",sms_communication: "0", ph_call_communication: "0", whatsapp_communication: "0"};
  responseData : any;
  ischecked : boolean = false;
  isSelect: boolean = true;
  userPostData = {"user":"","token":""};
  userDetails: any;
  apiUrl: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider, public alertCtrl: AlertController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    console.log(data);
    this.userDetails = data.user;
    console.log(this.userDetails);
    this.userPostData.user = this.userDetails;
    this.userPostData.token = data.token;
    this.apiUrl = this.authService.apiUrl;   
    this.signupform = new FormGroup({
      customer_communication: new FormControl('',Validators.compose([])),
      check_val: new FormControl('',Validators.compose([])),
      is_whatsapp: new FormControl(0,Validators.compose([])),
      is_email:new FormControl(0,Validators.compose([])),
      is_sms:new FormControl(0,Validators.compose([])),
      is_phone:new FormControl(0,Validators.compose([])),
    });
  }

  show(){
    console.log(this.signupform.get('is_whatsapp').value);
    if (this.signupform.get('is_whatsapp').value == true){
      this.userData.whatsapp_communication = "1";
    }else{
      this.userData.whatsapp_communication = "0";
    }
    if (this.signupform.get('is_email').value == true){
      this.userData.email_communication = "1";
    }else{
      this.userData.email_communication = "0";
    }
    if (this.signupform.get('is_sms').value == true){
      this.userData.sms_communication = "1";
    }else{
      this.userData.sms_communication = "0";
    }
    if (this.signupform.get('is_phone').value == true){
      this.userData.ph_call_communication = "1";
    }else{
      this.userData.ph_call_communication = "0";
    }
    if(this.signupform.get('is_whatsapp').value || this.signupform.get('is_sms').value || this.signupform.get('is_email').value || this.signupform.get('is_phone').value )
    {
      console.log('one is checked');
      this.isSelect = false;
    }
    else
    {
      this.isSelect = true;
      console.log('none is checked');
    }
  }
  change(value){
    console.log(value);
    if(value == 1){
      this.ischecked = true;
    }else{
      this.ischecked = false;
    }
    console.log(this.ischecked);
   }

   updateProfile(){
    this.authService.authData(this.userData,'edit-GDPR',this.userPostData.token).then((result: any) => {
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData.status)
      {
        this.navCtrl.push(DashbordPage);
        const alert = this.alertCtrl.create({
          subTitle: this.responseData.message,
          buttons: ['OK']
        })
        alert.present();
        const data = JSON.parse(localStorage.getItem('userData'));
        
        data.GDP =1;
        localStorage.setItem('userData', JSON.stringify(data));
      }
      else{ console.log(this.responseData.error); 
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
       subTitle: this.responseData.success.error,
       buttons: ['OK']
     })
     alert.present();
    });
  }
}
