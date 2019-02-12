import { DashbordPage } from './../dashbord/dashbord';
import { Facebook , FacebookLoginResponse} from '@ionic-native/facebook';
import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage{
  signupform: FormGroup;
  userData = { name: '',email: "",password: "",password_confirmation: "",ph_no: "",provider_name: "",provider_id: "", customer_communication: "0",email_communication: "0",sms_communication: "0", ph_call_communication: "0", whatsapp_communication: "0"};
  responseData : any;
  facebookData: any;
  registervalue: any;
  goData: any;
  googleData: any;
  ischecked : boolean = false;
  isSelect: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
             public authService: AuthServiceProvider, public alertCtrl: AlertController , private facebook: Facebook, public googlePlus: GooglePlus) {
            //  alert("rejValue"+JSON.stringify(this.navParams.get('registervalue')));
         if(this.navParams.get('registervalue')){
          this.registervalue = this.navParams.get('registervalue');
         // alert(this.registervalue);
        this.userData.name = this.registervalue.name;
        this.userData.email = this.registervalue.email;
        this.userData.provider_name = this.registervalue.provider_name;
        this.userData.provider_id = this.registervalue.provider_id;
         
        //  alert("user"+this.userData);
         }else{
          this.registervalue = [];
       //   alert(this.registervalue);
         }
         let EMAILPATTERN =/^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|[0-9]{10}$/;
    let MOBILEPATTERN =/^[0-9]+$/;
    this.signupform = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])),
      name: new FormControl(this.userData.name, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      email: new FormControl(this.userData.email, [Validators.required, Validators.pattern(EMAILPATTERN)]),
      ph_no: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern(MOBILEPATTERN)]),
      provider_name: new FormControl(this.userData.provider_name, Validators.compose([])),
      provider_id: new FormControl(this.userData.provider_id, Validators.compose([])),
      password_confirmation: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), this.equalto('password')])),
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
        this.userData.name = this.registervalue.name;
        this.userData.email = this.registervalue.email;
        this.userData.provider_name = this.registervalue.provider_name;
        this.userData.provider_id = this.registervalue.provider_id;
       //alert(this.registervalue);
       // this.navCtrl.push(RegistrationPage,{registervalue:  this.registervalue});
       
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
        this.userData.name = this.registervalue.name;
        this.userData.email = this.registervalue.email;
        this.userData.provider_name = this.registervalue.provider_name;
        this.userData.provider_id = this.registervalue.provider_id;
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
      console.log(this.userData);
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
       
        if(this.userData.provider_id != "" && this.userData.provider_name != ""){
         
        this.navCtrl.push(DashbordPage);
        }else{
         
          const alert = this.alertCtrl.create({
            title: 'Success',
          subTitle: this.responseData.message,
            buttons: ['OK']
          })
          alert.present();
        }
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
    change(value){
     console.log(value);
     if(value == 1){
       this.ischecked = true;
     }else{
       this.ischecked = false;
     }
     console.log(this.ischecked);
    }
}
