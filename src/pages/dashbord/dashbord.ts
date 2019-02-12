import { PersonalTrainingBookingPage } from './../personal-training-booking/personal-training-booking';
import { PricingPage } from './../pricing/pricing';
import { ViewMotPage } from './../view-mot/view-mot';
import { ViewBookingsPage } from './../view-bookings/view-bookings';
import { BootcampSessionPage } from './../bootcamp-session/bootcamp-session';
import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { ViewbootcampPurchasePage } from '../viewbootcamp-purchase/viewbootcamp-purchase';


@IonicPage()
@Component({
  selector: 'page-dashbord',
  templateUrl: 'dashbord.html',
})
export class DashbordPage {
  userDetails: any;
  userPostData = {"user":"","token":""};
  responseData: any;
  purchaseHistory: any;
  type: any;
  bookingType : any;
  allBookings: any;
  bookingValue : any;
  selectPT: any;
  lastClicked: any;
  category: any;
  typeAs: any;
  bootcampValue = {};
  ptSessionValue= {};
  motDetails: any;
  freeBootDetails: any;
  bookingas: boolean = false;
  bookingState ={"state":"bootcamp","type":"future_booking"}
  bookingHistory = {"remainingSession":"","futureBooking":"","cancleBooking":"","declineBooking":""};
  dashboardCategory = [ {
    moduleName : "Free Session", 
  },{
    moduleName : "My Bookings", 
  },
  {
    moduleName : "Purchased history", 
  },
  {
    moduleName : "My MOT", 
  }
];
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
            private authService: AuthServiceProvider, private alertCtrl: AlertController) {
    const data = JSON.parse(localStorage.getItem('userData'));
   
                this.userDetails = data.user;
               
                this.userPostData.user = this.userDetails;
                this.userPostData.token = data.token;
                this.category = this.dashboardCategory[0].moduleName;
           this.getProducts(this.dashboardCategory[0]);
            

  }
  
  ionViewWillEnter(){
    //this.getProducts(this.dashboardCategory[0]);
    // this.bookingValue ="future_booking";
    // this.myBookings(this.bookingValue);
  }
  ionViewDidEnter(){
    if(this.authService.pageReset)
    {
      console.log(this.lastClicked);
      this.getProducts(this.lastClicked);
    }
  }
getProducts(c: any)
  {
    
    this.lastClicked = c;
    this.category=c.moduleName;
    console.log(this.category);
    if(this.category=='Free Session')
    {
      this.typeAs="free-sessions";
    }
    else if(this.category=='My Bookings')
    {
      this.typeAs="mybooking";
    }
    else if(this.category=='Purchased history')
    {
      this.typeAs="purchased-history";
    }
    else if(this.category=='My MOT')
    {
      this.typeAs="customer_my_mot";
    }
    console.log(this.typeAs)
    if(this.typeAs =="purchased-history"){
    this.authService.getData(this.typeAs,this.userPostData.token).then((result) => {
      this.responseData = result;

      if(this.responseData.status == true)
      {
      console.log(this.responseData.purchase_history.data);

      const value = this.responseData.purchase_history.data;
      this.purchaseHistory = value;
       this.type ="purchaseHistory";
      }
      else{
       const alert = this.alertCtrl.create({
        title: 'Failure',
         subTitle: this.responseData.message,
         buttons: ['OK']
       })
       alert.present();
       this.purchaseHistory = [];
       //this.no_data=true;
     }
    },
    (err) => {
     
     this.responseData = err.json();
     console.log(this.responseData)
    });
  }
  else if(this.typeAs =="customer_my_mot"){
    this.authService.authData({},this.typeAs,this.userPostData.token).then((result: any) => {
      this.responseData = result;
      if(result.status)
      {
        
      console.log(this.responseData.my_mots);
     this.motDetails = this.responseData.my_mots;
     this.type ="myMOT";
      }
      else{ console.log(this.responseData.error); 
        const alert = this.alertCtrl.create({
          subTitle: this.responseData.message,
          buttons: ['OK']
   
        })
        alert.present();
      }
    }, (err) => {
     this.responseData = err;
     console.log(this.responseData)
     const alert = this.alertCtrl.create({
       subTitle: this.responseData.error,
       buttons: ['OK']
     })
     alert.present();
    });
  }
  else if(this.typeAs =="mybooking"){
    //this.bookingValue ="future_booking";
    console.log(this.bookingState);
    this.myBookings();
  }
    else if(this.typeAs =="free-sessions"){
      this.authService.getData(this.typeAs,this.userPostData.token).then((result: any) => {
        this.responseData = result;
        if(result.status)
        {
          
        console.log(this.responseData);
        const flag = this.responseData.flag;
        if(flag == 1){
          this.freeBootDetails = this.responseData.remaining_sessions;
          this.type ="freeBootcamp";
        }else{

          this.dashboardCategory = [ {
            moduleName : "My Bookings", 
          },
          {
            moduleName : "Purchased history", 
          },
          {
            moduleName : "My MOT", 
          }
        ];
        this.getProducts(this.dashboardCategory[0]);
          // this.bookingValue ="future_booking";
          // console.log(this.bookingValue);
          // this.myBookings(this.bookingValue);
        }
        }
        else{ console.log(this.responseData); 
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
    
  
  }
  viewMot(mot){
    this.navCtrl.push(ViewMotPage,{mot: mot});
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
     this.allBookings = [];
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
     this.allBookings = [];
     //this.no_data=true;
   }
  },
  (err) => {
    
   this.responseData = err.json();
   console.log(this.responseData)
  });
  }
}

  //showing bookings details
  myBookings(){
    console.log(this.bookingState);
   // this.bookingValue = bookWiseValue;
    //console.log(this.bookingValue);
    this.type ="myBookings";
    if(this.bookingState.type == "future_booking"){
      this.bookingas = true;
    }else{
      this.bookingas = false;
    }
    console.log(this.bookingas);
   // alert(this.userPostData.token);
    this.authService.authData({option :this.bookingState.type,session: this.bookingState.state},'mybooking',this.userPostData.token).then((result) => {
      
      this.responseData = result;

      if(this.responseData.status == true)
      {
      console.log(this.responseData);

      const value = this.responseData;
      if(value.all_booking.length > 0){
        console.log("in if");
        this.allBookings = value.all_booking;
      }else if(value.all_pt_booking.length > 0){
        console.log("in else");
        this.allBookings = value.all_pt_booking;
      }
      // this.allBookings = value.all_booking;
      // this.ptBookings = value.all_pt_booking;
      this.bootcampValue = value.bootcamp;
      this.ptSessionValue =  value.pt_session;
      // this.bookingHistory.cancleBooking = value.total_cancelled_booking;
      // this.bookingHistory.futureBooking = value.total_future_booking;
      // this.bookingHistory.remainingSession = value.no_of_sessions;
      console.log(this.bookingHistory);
       this.bookingType ="bookingHistory";
      }
      else{
       const alert = this.alertCtrl.create({
        title: 'Failure',
         subTitle: this.responseData.message,
         buttons: ['OK']
       })
       alert.present();
       //this.allBookings = [];
       //this.no_data=true;
     }
    },
    (err) => {
      
     this.responseData = err.json();
     console.log(this.responseData)
    });
    // this.menuCtrl.close();
  }
    onOpenMenu(){
      this.menuCtrl.open();
      }
      viewPurchase(purchase){
        this.navCtrl.push(ViewbootcampPurchasePage,{purchase: purchase});
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
                      this.navCtrl.push(PricingPage,{purchaseType:"bootcamp"});
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
      // openBookingHistory(bookingHistory){
      //   this.bookingHistory = bookingHistory;
      //   this.bookingType ="bookingHistory";
      // }
      // showAllBookings(allBookingsssss){
        
      //   this.allBookings = allBookingsssss;
      //   console.log(this.allBookings);
      //   this.bookingType ="allBoook";
      // }
      viewBookings(bookings){
       
          this.navCtrl.push(ViewBookingsPage,{bookings: bookings});
        
      }
      notCancle(){
        const alert = this.alertCtrl.create({
          title: 'Confirm',
           subTitle: 'Automatic cancelation is not allowed any more, please contact admin',
           buttons: ['OK']
         })
         alert.present();
      }
      cancle(bookingId){
       var booking = bookingId;
       console.log(booking);
        let alert = this.alertCtrl.create({
          title: 'Confirm',
          message: 'Are you sure you want to cancel this bootcamp session?',
          buttons: [{
            text: "ok",
            handler: () => {
                //create loader
             
             
              this.authService.authData({id : bookingId},'bootcamp-booking-cancel-customer',this.userPostData.token).then((result) => {
                
                this.responseData = result;
    
    
              if(this.responseData.status == true)
              {
    
                const alert = this.alertCtrl.create({
                  subTitle: this.responseData.message,
                  buttons: [{
                    text: 'Ok',
                  handler: () => {
    
                    let navTransition = alert.dismiss();
    
                      navTransition.then(() => {
                        this.getProducts(this.lastClicked);
                      });
    
                    return false;
                  }
                }]
                });
                alert.present();
    
              }
              else{
               const alert = this.alertCtrl.create({
                 subTitle: this.responseData.message,
                 buttons: ['OK']
               })
               alert.present();
             }
            },
            (err) => {
             
             this.responseData = err.json();
             const alert = this.alertCtrl.create({
              subTitle: this.responseData.message,
              buttons: ['OK']
            })
            alert.present();
            });
          }
          }, {
            text: "Cancel",
            role: 'cancel'
          }]
        })
        alert.present();
      }
}
