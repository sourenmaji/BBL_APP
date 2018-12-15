
import { ChangePasswordPage } from './../pages/change-password/change-password';
import { EditProfilePage } from './../pages/edit-profile/edit-profile';
import { ServicePage } from './../pages/service/service';
import { ContactusPage } from './../pages/contactus/contactus';
import { TestimonialsPage } from './../pages/testimonials/testimonials';
import { ExercisePage } from './../pages/exercise/exercise';
import { PricingPage } from './../pages/pricing/pricing';
import { DashbordPage } from './../pages/dashbord/dashbord';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  selector: 'page-app',
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  editProfilePage = EditProfilePage;
  changePasswordPage = ChangePasswordPage;
  activePage: any;
  highlighted: any[];
  pages: any;
  isclick: boolean = false;
  @ViewChild('nav') nav: NavController;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
this.isclick = false;
      this.pages =[
        {title: 'Dashboard', component: DashbordPage, iconName: "easel"},
        {title: 'Pricing', component: PricingPage, iconName: "cash"},
        {title: 'Exercise', component: ExercisePage, iconName: "body"},
        {title: 'Testimonials', component: TestimonialsPage, iconName: "swap"},
        {title: 'Contact Us', component: ContactusPage, iconName: "contacts"},
        {title: 'Services', component: ServicePage, iconName: "construct"},
        {title: 'Profile', component: null, iconName: "contact"},
        {title: 'Edit Profile', component: EditProfilePage, iconName: "create"},
        {title: 'Change Password', component: ChangePasswordPage, iconName: "key"},
        {title: 'Log Out', component: null, iconName: "log-out"},
      ]
      this.activePage = this.pages[0];
    });
  }
  openPage(page){
    if(page.component != null){

      this.nav.setRoot(page.component);
      this.menuCtrl.close();
      this.activePage = page;

    }
    
  }
  
  onLogout()
{
  localStorage.clear();
  setTimeout(() => this.nav.setRoot(LoginPage), 1000);
  this.menuCtrl.close();
}
checkActive(page){
return page == this.activePage;
}

clickProfile(){
this.isclick = !this.isclick;
}
onload(page: any){
  this.nav.setRoot(page);
  this.menuCtrl.close();
}
}

