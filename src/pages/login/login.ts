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
 
//UTENTE ENTRA SE Loggato VA NELLA HOME
  ionViewWillEnter() {
    var user = firebase.auth().currentUser;
    if (user) this.navCtrl.setRoot("ProfilePage");
  }  
  
  //Metodo login 
  login() {
    /*  
 Crea un indicatore di caricamento
    */
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
//Messaggio allerta login utente//
presentAlert(message) {
  let alert = this.alertCtrl.create({
    title: 'Errore Riprova',
    subTitle: message,
    buttons: ['Close']
  });
  alert.present();
}
//REGISTRATI CLICK E VA SU REGISTER PAGE
  showRegisterPage() {
    this.navCtrl.push("RegisterPage");
  }



}
