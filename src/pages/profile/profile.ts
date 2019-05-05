
import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
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
  
  customerName: any;
  customerEmail:any;
  customerAddr:any;
  

   
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthProvider,
   
    ) {
  }
  ionViewWillEnter() {
    var user = firebase.auth().currentUser;
    if (!user) this.navCtrl.setRoot("LoginPage");
   else{
      this.ionViewDidLoad();
    }
   }

  ionViewDidLoad() {
   
      this.authService
        .getuserdetails()
       
        .then((response: any) => {
          this.customerName = response.name;
          this.customerEmail = response.email;
          this.customerAddr = response.address;

         console.log('Benvenuto',this.customerName);
        
        })
        .catch(err => {
          console.log("err", err);
        });

    
  }
 
 showCartPage() {
  this.navCtrl.push("CartPage");
}

  logout() {
    firebase.auth().signOut().then(function() {
      window.localStorage.clear();
     
      console.log('Signout Succesfull')
      
   }, function(error) {
      console.log('Signout Failed')  
   });
    
   this.navCtrl.setRoot('HomePage');
  }
 
}


