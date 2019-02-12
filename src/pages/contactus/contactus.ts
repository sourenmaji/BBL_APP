import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage implements OnInit{
  contactusform: FormGroup;
  userData = { user_name: "",user_email : "",user_subject : "",user_phone : "",message: "",};
responseData : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public authService: AuthServiceProvider,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }
  ngOnInit() {
    let EMAILPATTERN =/^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|[0-9]{10}$/;
    let MOBILEPATTERN =/^[0-9]+$/;
    this.contactusform = new FormGroup({
      user_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      user_email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      user_subject: new FormControl('', [Validators.required]),
      user_phone : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern(MOBILEPATTERN)]),
      message: new FormControl('', Validators.compose([]))
    });
  }

  onOpenMenu(){
    this.menuCtrl.open();
    }

    contactUs(){
      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loader.present();
      
       this.authService.postData(this.userData,'contact-us')
       .then((result) => {
        this.responseData = result;
       console.log(this.responseData);
        if(this.responseData.status)
        {
          loader.dismiss();
       
          const alert = this.alertCtrl.create({
            title: 'Failure',
          subTitle: this.responseData.message,
            buttons: ['OK']
          })
          alert.present();
        
        }
        else{
          const alert = this.alertCtrl.create({
            title: 'Failure',
          subTitle: this.responseData.message,
            buttons: ['OK']
          })
          alert.present();
          loader.dismiss(); 
        }
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

}
