import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-bootcamp-session',
  templateUrl: 'bootcamp-session.html',
})

export class BootcampSessionPage implements OnInit{
  
  seesionBookingForm: FormGroup;
  sessionData = { availableDate: "",availableTime: ""};
  responseData: any;
  bootAddress = "";
  userDetails: any;
  userPostData = {"user":"","token":""};
  bootDate: any;
  bootTime: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public authService: AuthServiceProvider,
              public alertCtrl: AlertController) {
                const data = JSON.parse(localStorage.getItem('userData'));
                this.userDetails = data.user;
                console.log(this.userDetails);
                this.userPostData.user = this.userDetails;
                this.userPostData.token = data.token;
  }
  ngOnInit() {
    this.seesionBookingForm = new FormGroup({
      
      availableDate: new FormControl('', [Validators.required]),
      availableTime: new FormControl('', [Validators.required]),
    });
  }
  ionViewWillEnter(){
    this.openAddress();
  }
  //for getting address
  openAddress(){
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.authService.getData('booking-bootcamp', this.userPostData.token).then((result) => {
      loader.dismiss();
      this.responseData = result;

      if(this.responseData.status == true)
      {
      console.log(this.responseData.bootcampaddress);

      const value = this.responseData.bootcampaddress;
      const valu1 = this.responseData.date_details;
      console.log(valu1);
      this.bootAddress = value;
      this.bootDate = valu1;
      }
      else{
       const alert = this.alertCtrl.create({
        title: 'Failure',
         subTitle: this.responseData.message,
         buttons: ['OK']
       })
       alert.present();
       
      
     }
    },
    (err) => {
      loader.dismiss();
     this.responseData = err.json();
     console.log(this.responseData);
    });
  }
  //for getting date
  // onSelectChange(selectedValue: any){
  //   console.log(selectedValue);
    
  //   this.authService.authData({address_id :selectedValue},'get_bootcamp_date', this.userPostData.token).then((result) => {
      
  //     this.responseData = result;

  //     if(this.responseData.status == true)
  //     {
  //     console.log(this.responseData.date_details);

  //     const value = this.responseData.date_details;
  //     this.bootDate = value;

  //     }
  //     else{
  //      const alert = this.alertCtrl.create({
  //       title: 'Failure',
  //        subTitle: this.responseData.message,
  //        buttons: ['OK']
  //      })
  //      alert.present();
  //    }
  //   },
  //   (err) => {
      
  //    this.responseData = err.json();
  //    console.log(this.responseData)
  //   });
  // }
//for getting time
  timeSelect(timeValue: any){
   
    this.authService.authData({bootcamp_date  :timeValue},'get_bootcamp_time', this.userPostData.token).then((result) => {
     
      this.responseData = result;

      if(this.responseData.status == true)
      {
      console.log(this.responseData.time_details);

      const value = this.responseData.time_details;
      this.bootTime = value;

      }
      else{
       const alert = this.alertCtrl.create({
        title: 'Failure',
         subTitle: this.responseData.message,
         buttons: ['OK']
       })
       alert.present();
     }
    },
    (err) => {
      
     this.responseData = err.json();
     console.log(this.responseData)
    });
  }
  //add session
  addSession(){
    console.log(this.sessionData);
    this.authService.authData({schedule_id :this.sessionData.availableTime},'bootcamp-booking', this.userPostData.token).then((result) => {
     
      this.responseData = result;

      if(this.responseData.status == true)
      {
        this.authService.pageReset = true;
        this.navCtrl.pop();
        const alert = this.alertCtrl.create({
          title: 'Success',
           subTitle: "You have successfully booked your bootcamp session.",
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
     }
    },
    (err) => {
      
     this.responseData = err.json();
     console.log(this.responseData)
    });
  }
}
