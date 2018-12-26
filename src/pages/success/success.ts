import { PricingPage } from './../pricing/pricing';
import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { BootcampSessionPage } from './../bootcamp-session/bootcamp-session';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage {
order_ref_id : any;
responseData: any;
userDetails: any;
userPostData = {"user":"","token":""};
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private loadingCtrl: LoadingController,
              public authService: AuthServiceProvider,public alertCtrl: AlertController) {
    this.order_ref_id = this.navParams.get('order_ref_id');
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
            }else if(this.responseData.flag == 0){
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
}
