import { Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from "firebase";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  avatar: string;
  displayName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: AuthProvider,
    public zone: NgZone, public alertCtrl: AlertController,
    ) {
  }
 
  ionViewWillEnter() {
    var user = firebase.auth().currentUser;
    if (!user) this.navCtrl.setRoot("LoginPage");
  }
 
 
  /*ingOrder(){
    let loader = this.loadingCtrl.create({
      content: "Placing Order.."
    });
    loader.present();
    var user = firebase.auth().currentUser;
  
  
  }
  */
  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }
}


