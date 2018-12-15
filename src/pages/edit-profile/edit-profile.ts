import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage implements OnInit{
  editform: FormGroup;
  userDetails : any;
  responseData: any;
  userPostData = {"user":"","token":""};
  editUserDetails : any;
  newU = {"success": {"token":"","user":""}};
  userData = { name: "",email: "",ph_no: "",address: ""};
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
              private authService: AuthServiceProvider, private alertCtrl: AlertController) {
  
    const data = JSON.parse(localStorage.getItem('userData'));
                this.userDetails = data.user;
                console.log(this.userDetails);
                this.userPostData.user = this.userDetails;
                this.userPostData.token = data.token;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  onOpenMenu(){
    this.menuCtrl.open();
    }
    ngOnInit() {
      //console.log(this.user_OTP);
      let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let PHONEPATTERN = /^[0-9]{10}$/;
  
      this.editform = new FormGroup({
       
        ph_no: new FormControl('', [Validators.required, Validators.pattern(PHONEPATTERN)]),
        name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
        email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
        address: new FormControl('', Validators.compose([])),
        otp: new FormControl('', Validators.compose([])),
  
        // otp: new FormControl('', Validators.compose([Validators.required,Validators.minLength(6),this.equalto('numb')]))
      });
  
     // console.log(this.buttonClicked)
    }

    updateProfile(){

      this.authService.authData(this.userData,'customer-updateprofile',this.userPostData.token).then((result: any) => {
        this.responseData = result;
        if(result.status)
        {
          
        console.log(this.responseData);
       this.editUserDetails = this.responseData;
       this.userDetails = this.editUserDetails.updatedUser;
       this.newU.success.user = this.userDetails;
       this.newU.success.token = this.userPostData.token;
         localStorage.setItem('userData', JSON.stringify(this.newU));
        const alert = this.alertCtrl.create({
         subTitle: this.responseData.message,
         buttons: ['OK']
  
       })
       alert.present();
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
