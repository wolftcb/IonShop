import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController, AlertController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import firebase from "firebase";




@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  email: any;
  password: any;

  constructor(public navCtrl: NavController, public authService: AuthProvider,
    private loadingCtrl: LoadingController,private alertCtrl: AlertController) {}

  ionViewDidLoad() {}
 
  ionViewWillEnter() {
    var user = firebase.auth().currentUser;
    if (user) this.navCtrl.setRoot("HomePage");
  }
  login() {

    let loader = this.loadingCtrl.create({
      content: 'Authenticating..'
    });
    loader.present();
    let loginParams = {
      email:this.email,
      password:this.password
    }

    this.authService.login(loginParams).then((res)=>{
      loader.dismiss();
      this.navCtrl.setRoot('HomePage');
    }).catch((err)=>{
      loader.dismiss();
      this.presentAlert(err.message);
    });


  }

  showRegisterPage() {
    this.navCtrl.push("RegisterPage");
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Auth Error',
      subTitle: message,
      buttons: ['Close']
    });
    alert.present();
  }


}
