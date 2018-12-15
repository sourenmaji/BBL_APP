import { ViewBookingsPage } from './../pages/view-bookings/view-bookings';
import { ViewbootcampPurchasePage } from './../pages/viewbootcamp-purchase/viewbootcamp-purchase';
import { SuccessPage } from './../pages/success/success';

import { PaymentsPage } from './../pages/payments/payments';
import { PricingSubscribePage } from './../pages/pricing-subscribe/pricing-subscribe';
import { ViewMotPage } from './../pages/view-mot/view-mot';
import { ChangePasswordPage } from './../pages/change-password/change-password';
import { HTTP } from '@ionic-native/http';
import { ServicePage } from './../pages/service/service';
import { TestimonialsPage } from './../pages/testimonials/testimonials';
import { PricingPage } from './../pages/pricing/pricing';
import { DashbordPage } from './../pages/dashbord/dashbord';
import { AuthServiceProvider } from './../providers/auth-service/authservice';
import { ForgetPasswordPage } from './../pages/forget-password/forget-password';
import { RegistrationPage } from './../pages/registration/registration';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ExercisePage } from '../pages/exercise/exercise';
import { TruncateModule } from '@yellowspot/ng-truncate';
import { ContactusPage } from '../pages/contactus/contactus';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { BootcampSessionPage } from '../pages/bootcamp-session/bootcamp-session';
import { Stripe } from '@ionic-native/stripe';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    ForgetPasswordPage,
    DashbordPage,
    PricingPage,
    ExercisePage,
    TestimonialsPage,
    ContactusPage,
    ServicePage,
    EditProfilePage,
    ChangePasswordPage,
    ViewMotPage,
    PricingSubscribePage,
    PaymentsPage,
    SuccessPage,
    ViewbootcampPurchasePage,
    BootcampSessionPage,
    ViewBookingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    TruncateModule,
    NgxDatatableModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    ForgetPasswordPage,
    DashbordPage,
    PricingPage,
    ExercisePage,
    TestimonialsPage,
    ContactusPage,
    ServicePage,
    EditProfilePage,
    ChangePasswordPage,
    ViewMotPage,
    PricingSubscribePage,
    PaymentsPage,
    SuccessPage,
    ViewbootcampPurchasePage,
    BootcampSessionPage,
    ViewBookingsPage
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
  Stripe
  ]
})
export class AppModule {}
