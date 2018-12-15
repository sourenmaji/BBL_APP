import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage implements OnInit{
  contactusform: FormGroup;
  userData = { name: "",user: "",subject: "",phone: "",message: "",};
responseData : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  }
  ngOnInit() {
    let EMAILPATTERN =/^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|[0-9]{10}$/;
    let MOBILEPATTERN =/^[0-9]+$/;
    this.contactusform = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      user: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      subject: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern(MOBILEPATTERN)]),
      message: new FormControl('', Validators.compose([]))
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }
  onOpenMenu(){
    this.menuCtrl.open();
    }
}
