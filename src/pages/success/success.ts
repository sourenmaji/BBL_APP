import { PersonalTrainingBookingPage } from './../personal-training-booking/personal-training-booking';
import { PricingPage } from './../pricing/pricing';
import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { BootcampSessionPage } from './../bootcamp-session/bootcamp-session';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage {
order_ref_id : any;
responseData: any;
userDetails: any;
training_type: any;
selectPT: any;
userPostData = {"user":"","token":""};
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
              public authService: AuthServiceProvider,public alertCtrl: AlertController) {
    this.order_ref_id = this.navParams.get('order_ref_id');
    this.training_type = this.navParams.get('training_type');
    console.log(this.training_type);
    const data = JSON.parse(localStorage.getItem('userData'));
   
                this.userDetails = data.user;
               
                this.userPostData.user = this.userDetails;
                this.userPostData.token = data.token;
  }

  onOpenMenu(){
    this.menuCtrl.open();
  }
  openBootcampSession(){
    this.openAddress();
      }
      openAddress(){
        
        this.authService.getData('booking-bootcamp', this.userPostData.token).then((result) => {
          
          this.responseData = result;
    
          if(this.responseData.status == true)
          {
            if(this.responseData.flag == 1){
          console.log(this.responseData.bootcampaddress);
          
          const value = this.responseData.bootcampaddress;
          const valu1 = this.responseData.date_details;
          this.navCtrl.push(BootcampSessionPage,{address:  value, date: valu1});
          console.log(valu1);
          // this.bootAddress = value;
          // this.addressLine1 = value.address_line1;
          // this.bootDate = valu1;
            }else if(this.responseData.flag == 0 && this.responseData.blank_flag == 0){
              let alert = this.alertCtrl.create({
                title: 'Confirm',
                message: "You Don't Have Any Purchased Bootcamp Session, Do You Want To Purchase Bootcamp Session?",
                buttons: [{
                  text: "Yes",
                  handler: () => {
                      this.navCtrl.push(PricingPage);
                }
                }, {
                  text: "Cancel",
                  role: 'cancel'
                }]
              })
              alert.present();
            }
            else if(this.responseData.flag == 0 && this.responseData.blank_flag == 1){
              let alert = this.alertCtrl.create({
                title: 'Confirm',
                message: "Your Purchased Plan is Not Approved Yet",
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
         
         this.responseData = err.json();
         console.log(this.responseData);
        });
      }

      // open PT section
  bookPt(selectEvent: any){
    this.selectPT= selectEvent;
    console.log(this.selectPT);
    if(this.selectPT == "book_by_time"){
      this.authService.getData('booking-pt-by-date',this.userPostData.token).then((result) => {
          
        this.responseData = result;
        console.log(this.responseData);
        if(this.responseData.status == true)
        {
        //console.log(this.responseData);
      if(this.responseData.flag == 1){
        const value = this.responseData.pt_session_address;
        const valu1 = this.responseData.date_details;
        this.navCtrl.push(PersonalTrainingBookingPage,{address:  value, date: valu1,type: "ptByDate"});
      }else if(this.responseData.flag == 0 && this.responseData.blank_flag == 0){
        let alert = this.alertCtrl.create({
          title: 'Confirm',
          message: "You Don't Have Any Purchased Personal Training Session, Do You Want To Purchase Personal Training Session?",
          buttons: [{
            text: "Yes",
            handler: () => {
                this.navCtrl.push(PricingPage,{purchaseType:"personal_training"});
          }
          }, {
            text: "Cancel",
            role: 'cancel'
          }]
        })
        alert.present();
      }else if(this.responseData.flag == 0 && this.responseData.blank_flag == 1){
        let alert = this.alertCtrl.create({
          title: 'Confirm',
          message: "Your Purchased Plan is Not Approved Yet",
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
         
         //this.no_data=true;
       }
      },
      (err) => {
        
       this.responseData = err.json();
       console.log(this.responseData)
      });
    }else if(this.selectPT == "book_by_trainer"){
      this.authService.getData('booking-personal-training',this.userPostData.token).then((result) => {
          
        this.responseData = result;
        console.log(this.responseData);
        if(this.responseData.status == true)
        {
        //console.log(this.responseData);
    
        if(this.responseData.flag == 1){
          const value = this.responseData.pt_session_address;
          const valu1 = this.responseData.all_pt_trainer;
          this.navCtrl.push(PersonalTrainingBookingPage,{address:  value, trainer: valu1,type: "ptByTrainer"});
        }else if(this.responseData.flag == 0 && this.responseData.blank_flag == 0){
          let alert = this.alertCtrl.create({
            title: 'Confirm',
            message: "You Don't Have Any Purchased Personal Training Session, Do You Want To Purchase Personal Training Session?",
            buttons: [{
              text: "Yes",
              handler: () => {
                  this.navCtrl.push(PricingPage,{purchaseType:"personal_training"});
            }
            }, {
              text: "Cancel",
              role: 'cancel'
            }]
          })
          alert.present();
        }
        else if(this.responseData.flag == 0 && this.responseData.blank_flag == 1){
          let alert = this.alertCtrl.create({
            title: 'Confirm',
            message: "Your Purchased Plan is Not Approved Yet",
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
         //this.no_data=true;
       }
      },
      (err) => {
        
       this.responseData = err.json();
       console.log(this.responseData)
      });
      }
    }
}
