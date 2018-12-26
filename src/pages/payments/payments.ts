import { Stripe } from '@ionic-native/stripe';
import { SuccessPage } from './../success/success';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceProvider } from './../../providers/auth-service/authservice';
import { FilePath } from '@ionic-native/file-path';
import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ToastController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FileUploadOptions, FileTransferObject, FileTransfer, FileUploadResult } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';
declare var cordova: any;


@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage implements OnInit{
  options: any;
  PayOptions: any;
  price: any;
  userDetails: any;
  responseData: any;
  paymentDetails: any;
  userPostData = {"user":"","token":""};
  userData = { product_id: "",package_description: "", filename: ""}
  targetPath = "";
  paymentform: FormGroup;
  lastImage: string = null;
  lastImgPath: any = "";
  apiUrl: string = '';
  result : FileUploadResult = null;
  cardPaymentform: FormGroup;
  loading: Loading;
  cardData = {number: "", expMonth:  null,expYear: null ,cvc: "", amount: 0, currency: "gbp"};
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController, public imagePicker: ImagePicker,
    private camera: Camera, public platform: Platform, private filePath: FilePath, private file: File, public toastCtrl: ToastController,
    private authService: AuthServiceProvider, private alertCtrl: AlertController,public stripe: Stripe,public loadingCtrl: LoadingController,
    private transfer: FileTransfer) {
    this.PayOptions = this.navParams.get('options');
    this.price = this.navParams.get('price');
    console.log(this.price.product_id);
    console.log(this.PayOptions);
    const data = JSON.parse(localStorage.getItem('userData'));
                this.userDetails = data.user;
                console.log(this.userDetails);
                this.userPostData.user = this.userDetails;
                this.userPostData.token = data.token;
     this.apiUrl = this.authService.apiUrl;         
  }

  ngOnInit() {
    
    this.paymentform = new FormGroup({
      // username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
      package_description: new FormControl('', [Validators.required])
    });
   
      this.cardPaymentform = new FormGroup({
        number: new FormControl('', Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16)])),
        expMonth: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
        expYear: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
        cvc: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3)])),
      });
    
  }
  ionViewDidLoad() {
    this.stripe.setPublishableKey('pk_test_pHf7liH3Wi3IVy3pHliAEOdT');
 
  }
  payOnline(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
    this.cardData.amount = this.price.total_price;
    //alert(JSON.stringify(this.cardData));
    this.stripe.createCardToken(this.cardData)
        .then((token) => {
         // alert(token.id);
         this.loading.dismissAll();
        this.responseData = token;
       // console.log(JSON.stringify(this.responseData));
       this.authService.authData({product_id:this.price.product_id,stripeToken:token.id},'bootcamp-stripe-payment',this.userPostData.token).then((result: any) => {
        this.responseData = result; 
        if(result.status)
        {
          
        console.log(this.responseData);
       this.paymentDetails = this.responseData;
      // alert(JSON.stringify(this.paymentDetails));
        const alert1 = this.alertCtrl.create({
         subTitle: this.responseData.message,
         buttons: ['OK']
  
       })
       alert1.present();
       this.navCtrl.push(SuccessPage,{order_ref_id:  this.paymentDetails.order_ref_id});
        }
        else{ 
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



        })
        .catch((error) => {
         this.responseData = error.JSON;
        })
  }
 // this.authService.getDataWithoutToken('pricing').then((result) => {
  // payOnline(){
  //   this.authService.authData({product_id:this.price.product_id},'bootcamp-onlinepayment',this.userPostData.token).then((result: any) => {
  //     this.responseData = result;
  //     if(result.status)
  //     {
        
  //     console.log(this.responseData);
  //    this.paymentDetails = this.responseData;
  //     const alert = this.alertCtrl.create({
  //      subTitle: this.responseData.message,
  //      buttons: ['OK']

  //    })
  //    alert.present();
  //    this.navCtrl.push(SuccessPage);
  //     }
  //     else{ console.log(this.responseData.error); 
  //       const alert = this.alertCtrl.create({
  //         subTitle: this.responseData.message,
  //         buttons: ['OK']
   
  //       })
  //       alert.present();
  //     }
  //   }, (err) => {
  //    this.responseData = err.json();
  //    console.log(this.responseData)
  //    const alert = this.alertCtrl.create({
  //      subTitle: this.responseData.success.error,
  //      buttons: ['OK']
  //    })
  //    alert.present();
  //   });
  // }
  pickImage()
  {
    
    
    this.imagePicker.getPictures({maximumImagesCount:1, quality:100, outputType:0}).then
    (results =>{
      alert(results);
      this.lastImgPath = results[0];
        // this.images.push(results[i]);
      alert(this.lastImgPath);
    });
  }


  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [

        {
          text: 'Load from Library',
          handler: () => {
            this.pickImage();
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 60,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
           alert("correctPath"+correctPath);
            alert("currentName"+currentName);
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        alert("correctPath"+correctPath);
            alert("currentName"+currentName);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }


  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.lastImgPath = this.pathForImage(this.lastImage);
      alert("lastImgPath"+this.lastImgPath);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }




  payBank(){
    
    this.targetPath = this.pathForImage(this.lastImage);
    this.userData.product_id = this.price.product_id;
    var data = this.userData;
    //alert("targetPath"+this.targetPath);
    if(this.targetPath != ""){
      data.filename = this.lastImage;
     // alert("filename"+this.lastImage);
      let headers = new Headers();
      headers.append('Authorization','Bearer '+ this.userPostData.token);
      console.log(headers);
      let options: FileUploadOptions = {
        fileKey: "file",
        fileName: data.filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : data,
        headers: {'Authorization': 'Bearer '+ this.userPostData.token}
      };

      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.upload(this.targetPath, this.apiUrl+'bootcamp-bankpayment', options).then((data) => {
        
        this.result = data;
        var success = JSON.parse(this.result.response);
        if(success.status===true){
        const alert = this.alertCtrl.create({
          subTitle: success.message,
          buttons: ['OK']
        })
        alert.present();
        this.navCtrl.push(SuccessPage);
        }
        else
        {
          const alert = this.alertCtrl.create({
            subTitle: success.message,
            buttons: ['OK']

          })
          alert.present();
        }
      },
      (err) => {
        
        // Error
        var error = JSON.parse(err.body);
        const alert = this.alertCtrl.create({
          subTitle: error.message,
          buttons: ['OK']

        })
        alert.present();

      });
    }
    else
    {
      this.authService.authData(this.userData,'bootcamp-bankpayment',this.userPostData.token).then((data) => {
        
        this.responseData = data;
        if(this.responseData.status===true)
        {

          const alert = this.alertCtrl.create({
            subTitle: this.responseData.message,
            buttons: ['OK']

          })
          alert.present();
          this.navCtrl.push(SuccessPage);
        }
        else{
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
         subTitle: this.responseData.message,
         buttons: ['OK']
       })
       alert.present();
      });
    }
  }
}
