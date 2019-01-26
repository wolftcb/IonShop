import { Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from "firebase";
//import { CartPage } from '../cart/cart';


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
  cartItems: any[] = [];
  displayName: string;
  productAmt: number = 0;
  totalAmount: number = 0;
  shippingFee: number = 20;
  customerName: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthProvider,
    public zone: NgZone, public alertCtrl: AlertController,
    ) {
  }
  ionViewDidLoad() {
    this.authService
      .getuserdetails()
      .then((response: any) => {
        this.customerName = response.name;
      })
      .catch(err => {
        console.log("err", err);
      });
  }
  ionViewWillEnter() {
    var user = firebase.auth().currentUser;
    if (!user) this.navCtrl.setRoot("LoginPage");
  }

 /*ion(){
  var user = firebase.database().ref();
  user.once("value")
    .then(function(snapshot) {
      var key = snapshot.key; // null
      var childKey = snapshot.child("/ordersdetails").key; // "ada"
    });

  
 }
 */
  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }
}


