import { ViewMotPage } from './../view-mot/view-mot';
import { ViewBookingsPage } from './../view-bookings/view-bookings';
import { BootcampSessionPage } from './../bootcamp-session/bootcamp-session';
import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
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
  lastClicked: any;
  category: any;
  typeAs: any;
  motDetails: any;
  bookingas: boolean = false;
  bookingHistory = {"remainingSession":"","futureBooking":"","cancleBooking":""};
  dashboardCategory = [ {
    moduleName : "My Bookings", 
  },
  {
    moduleName : "Purchased history", 
  },
  {
    moduleName : "My MOT", 
  }
];
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private loadingCtrl: LoadingController,
            private authService: AuthServiceProvider, private alertCtrl: AlertController) {
    const data = JSON.parse(localStorage.getItem('userData'));
                this.userDetails = data.user;
                console.log(this.userDetails);
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
    if(this.category=='My Bookings')
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
     this.responseData = err.json();
     console.log(this.responseData)
     const alert = this.alertCtrl.create({
       subTitle: this.responseData.success.error,
       buttons: ['OK']
     })
     alert.present();
    });
  }
  else if(this.typeAs =="mybooking"){
    this.bookingValue ="future_booking";
    console.log(this.bookingValue);
    this.myBookings(this.bookingValue);
  }
    this.menuCtrl.close();
  
  }
  viewMot(mot){
    this.navCtrl.push(ViewMotPage,{mot: mot});
  }
  //showing bookings details
  myBookings(bookWiseValue: any){
    this.bookingValue = bookWiseValue;
    console.log(this.bookingValue);
    this.type ="myBookings";
    if(this.bookingValue == "future_booking"){
      this.bookingas = true;
    }else{
      this.bookingas = false;
    }
    console.log(this.bookingas);
    this.authService.authData({option  :this.bookingValue},'mybooking',this.userPostData.token).then((result) => {
      
      this.responseData = result;

      if(this.responseData.status == true)
      {
      console.log(this.responseData);

      const value = this.responseData;
      this.allBookings = value.all_booking;
      this.bookingHistory.cancleBooking = value.total_cancelled_booking;
      this.bookingHistory.futureBooking = value.total_future_booking;
      this.bookingHistory.remainingSession = value.no_of_sessions;
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
       this.allBookings = [];
       //this.no_data=true;
     }
    },
    (err) => {
      
     this.responseData = err.json();
     console.log(this.responseData)
    });
    this.menuCtrl.close();
  }
    onOpenMenu(){
      this.menuCtrl.open();
      }
      viewPurchase(purchase){
        this.navCtrl.push(ViewbootcampPurchasePage,{purchase: purchase});
      }
      openBootcampSession(){
        this.navCtrl.push(BootcampSessionPage);
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
