
import { DashbordPageModule } from './../pages/dashbord/dashbord.module';
import { ViewbootcampPurchasePageModule } from './../pages/viewbootcamp-purchase/viewbootcamp-purchase.module';
import { ViewMotPageModule } from './../pages/view-mot/view-mot.module';
import { ViewBookingsPageModule } from './../pages/view-bookings/view-bookings.module';
import { TestimonialsPageModule } from './../pages/testimonials/testimonials.module';
import { SuccessPageModule } from './../pages/success/success.module';
import { ServicePageModule } from './../pages/service/service.module';
import { RegistrationPageModule } from './../pages/registration/registration.module';
import { PricingSubscribePageModule } from './../pages/pricing-subscribe/pricing-subscribe.module';
import { PricingPageModule } from './../pages/pricing/pricing.module';
import { PersonalTrainingBookingPageModule } from './../pages/personal-training-booking/personal-training-booking.module';
import { PaymentsPageModule } from './../pages/payments/payments.module';
import { LoginPageModule } from './../pages/login/login.module';
import { ForgetPasswordPageModule } from './../pages/forget-password/forget-password.module';
import { ExercisePageModule } from './../pages/exercise/exercise.module';
import { ErrorPageModule } from './../pages/error/error.module';
import { ContactusPageModule } from './../pages/contactus/contactus.module';
import { EditProfilePageModule } from './../pages/edit-profile/edit-profile.module';
import { ChangePasswordPageModule } from './../pages/change-password/change-password.module';
import { AuthServiceProvider } from './../providers/auth-service/authservice';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { TruncateModule } from '@yellowspot/ng-truncate';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Stripe } from '@ionic-native/stripe';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { ImagePicker } from '../../node_modules/@ionic-native/image-picker'
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network-provider/network_provider';
import { BootcampSessionPageModule } from '../pages/bootcamp-session/bootcamp-session.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GdprPageModule } from '../pages/gdpr/gdpr.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    TruncateModule,
    NgxDatatableModule,
    IonicModule.forRoot(MyApp),
    BootcampSessionPageModule,
    ChangePasswordPageModule,
    EditProfilePageModule,
    ContactusPageModule,
    ErrorPageModule,
    ExercisePageModule,
    ForgetPasswordPageModule,
    LoginPageModule,
    PaymentsPageModule,
    PersonalTrainingBookingPageModule,
    PricingPageModule,
    PricingSubscribePageModule,
    RegistrationPageModule,
    ServicePageModule,
    SuccessPageModule,
    TestimonialsPageModule,
    ViewBookingsPageModule,
    ViewMotPageModule,
    ViewbootcampPurchasePageModule,
    DashbordPageModule,
    GdprPageModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDDK5MydVx-HkNyQcPTBdDyIyrqbwVPST0'
    // })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    FilePath,
    File,
    FileTransfer,
  FileTransferObject,
  Stripe,
  Facebook,
  GooglePlus,
  ImagePicker,
  Network,
  NetworkProvider,
  InAppBrowser
  ]
})
export class AppModule {}
