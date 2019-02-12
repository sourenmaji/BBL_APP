import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-personal-training-booking',
  templateUrl: 'personal-training-booking.html',
})
export class PersonalTrainingBookingPage implements OnInit{
  userDetails: any;
  userPostData = {"user":"","token":""};
  dateAvailable : boolean =false;
  timeAvailable: boolean = false;
  trainerAvailable: boolean = false;
address: any;
responseData: any;
allTrainers: any;
type: any;
availableDate: any;
ptDate: any;
ptTime: any;
ptTrainers: any;
trainer_id: any;
bookByTrainerBookingForm: FormGroup;
sessionData = { availableDate: "",availableTime: "",address: "", availableTrainer: ""};
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public alertCtrl: AlertController) {
    const data = JSON.parse(localStorage.getItem('userData'));
   
                this.userDetails = data.user;
               
                this.userPostData.user = this.userDetails;
                this.userPostData.token = data.token;
    this.address = this.navParams.get('address');
    console.log("address",this.address);
    this.allTrainers = this.navParams.get('trainer');
    console.log("allTrainers",this.allTrainers);
    this.availableDate = this.navParams.get('date');
    console.log("availableDate",this.availableDate);
    this.type = this.navParams.get('type');
   console.log("type",this.type);
  }
  ngOnInit() {
    this.bookByTrainerBookingForm = new FormGroup({
      
      availableDate: new FormControl('', [Validators.required]),
      availableTime: new FormControl('', [Validators.required]),
      availableTrainer: new FormControl('', [Validators.required]),
    });
  }
  
  dateSelect(trainer: any){
    console.log(trainer);
    this.trainer_id = trainer;
     this.authService.authData({trainer_id :trainer},'booking_pt_date', this.userPostData.token).then((result) => {
      
       this.responseData = result;
 
       if(this.responseData.status == true)
       {
       console.log(this.responseData.date_details);
 
       const value = this.responseData.date_details;
       this.dateAvailable = true;
       this.ptDate = value;
 
       }
       else{
        const alert = this.alertCtrl.create({
         title: 'Failure',
          subTitle: this.responseData.message,
          buttons: ['OK']
        })
        this.dateAvailable = false;
        alert.present();
      }
     },
     (err) => {
       
      this.responseData = err;
      console.log(this.responseData)
     });
   }
   timeSelect(date: any){
    console.log(date);
    console.log(this.trainer_id)
     this.authService.authData({pt_date  :date,trainer_id : this.trainer_id},'booking_pt_time', this.userPostData.token).then((result) => {
      
       this.responseData = result;
 
       if(this.responseData.status == true)
       {
       console.log(this.responseData.time);
 
       const value = this.responseData.time;
       this.ptTime = value;
       this.timeAvailable = true;
       }
       else{
        const alert = this.alertCtrl.create({
         title: 'Failure',
          subTitle: this.responseData.message,
          buttons: ['OK']
        })
        this.timeAvailable = false;
        alert.present();
      }
     },
     (err) => {
       
      this.responseData = err;
      console.log(this.responseData)
     });
   }
   timeSelectBytime(date: any){
    console.log(date);
    //console.log(this.trainer_id)
     this.authService.authData({pt_date  :date},'get_pt_time_using_date', this.userPostData.token).then((result) => {
      
       this.responseData = result;
 
       if(this.responseData.status == true)
       {
       console.log(this.responseData.time);
       this .timeAvailable = true;
       const value = this.responseData.time;
       this.ptTime = value;
 
       }
       else{
        const alert = this.alertCtrl.create({
         title: 'Failure',
          subTitle: this.responseData.message,
          buttons: ['OK']
        })
        alert.present();
        this .timeAvailable = false;
      }
     },
     (err) => {
       
      this.responseData = err;
      console.log(this.responseData)
     });
   }
   trainerSelect(time: any){
    console.log(time);
    this.authService.authData({pt_time_id   :time},'get_pt_trainer_using_time', this.userPostData.token).then((result) => {
      
      this.responseData = result;

      if(this.responseData.status == true)
      {
      console.log(this.responseData.all_pt_trainer);
     this.trainerAvailable = true;
      const value = this.responseData.all_pt_trainer;
      this.ptTrainers = value;

      }
      else{
       const alert = this.alertCtrl.create({
        title: 'Failure',
         subTitle: this.responseData.message,
         buttons: ['OK']
       })
       alert.present();
       this.trainerAvailable = false;
     }
    },
    (err) => {
      
     this.responseData = err;
     console.log(this.responseData)
    });
   }

   addPtByDate(){
    console.log(this.sessionData);
    console.log(this.address);
    this.sessionData.address = this.address.address_line1;
    this.authService.authData(this.sessionData,'pt-booking-by-date', this.userPostData.token).then((result) => {
     
      this.responseData = result;

      if(this.responseData.status == true)
      {
        if(this.responseData.flag == 1){
        this.authService.pageReset = true;
        this.navCtrl.pop();
        const alert = this.alertCtrl.create({
          title: 'Success',
           subTitle: "You have successfully booked your personal training session.",
           buttons: ['OK']
         })
         alert.present();
        }else if(this.responseData.flag == 0){
          this.authService.pageReset = true;
          this.navCtrl.pop();
          const alert = this.alertCtrl.create({
            title: 'Success',
             subTitle: "You don't have any personal training session",
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
     }
    },
    (err) => {
      
     this.responseData = err;
     console.log(this.responseData)
    });
   }
   addBookByTrainer(){
    console.log(this.sessionData);
    console.log(this.address);
    this.sessionData.address = this.address.address_line1;
    this.authService.authData(this.sessionData,'personal-training-booking', this.userPostData.token).then((result) => {
     
      this.responseData = result;

      if(this.responseData.status == true)
      {
        if(this.responseData.flag == 1){
        this.authService.pageReset = true;
        this.navCtrl.pop();
        const alert = this.alertCtrl.create({
          title: 'Success',
           subTitle: "You have successfully booked your personal training session.",
           buttons: ['OK']
         })
         alert.present();
        }else if(this.responseData.flag == 0){
          this.authService.pageReset = true;
          this.navCtrl.pop();
          const alert = this.alertCtrl.create({
            title: 'Success',
             subTitle: "You don't have any personal training session",
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
     }
    },
    (err) => {
      
     this.responseData = err;
     console.log(this.responseData)
    });
  }
}
