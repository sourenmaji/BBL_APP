import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-view-mot',
  templateUrl: 'view-mot.html',
})
export class ViewMotPage {
mot: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    this.mot = this.navParams.get('mot');
    console.log(this.mot);
  }
  onOpenMenu(){
    this.menuCtrl.open();
  }

}
