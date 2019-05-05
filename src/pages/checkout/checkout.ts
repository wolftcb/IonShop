import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import firebase from "firebase";
import { CartProvider } from "../../providers/cart/cart";
import { AuthProvider } from "../../providers/auth/auth";
import { OrderProvider } from "../../providers/order/order";


@IonicPage()
@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage {
  cartItems: any[] = [];
  productAmt: number = 0;
  totalAmount: number = 0;
  shippingFee: number = 20;
  customerName: any;
  storage: any;
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartProvider,
    private loadingCtrl: LoadingController,
    public authService: AuthProvider,
    private orderService: OrderProvider
  ) {}
  /*
  Il nostro primo compito è quello di assicurarsi che solo gli utenti loggati possano accedere alla pagina di checkout, quindi dobbiamo prima controllare in ionicViewWillEnter 
  */
  ionViewWillEnter() {
    var user = firebase.auth().currentUser;
    if (!user) this.navCtrl.setRoot("LoginPage");
    else{
      this.loadCartItems();
    }
  }
/*
Il nostro secondo compito è visualizzare le informazioni sull'ordine nella pagina.
Per raggiungere questo obiettivo, chiameremo due metodi dai nostri fornitori: 
getCartItems da cartProvider e getUserDetails di AuthProvider.
*/
  loadCartItems() {
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    loader.present();
    this.cartService.getCartItems()
      .then(val => {
        this.cartItems = val;

        if (this.cartItems.length > 0) {
          this.cartItems.forEach((val) => {
            this.productAmt += parseInt(val.totalPrice);
          });

          this.totalAmount = this.productAmt + this.shippingFee;
        }
        loader.dismiss();
      })
      .catch(err => {});
  }

  ionViewDidLoad() {
    this.authService
      .getuserdetails()
      .then((response: any) => {
        this.customerName = response.name;
        
        console.log(this.customerName,"STA ACQUISTANDO",this.cartItems);
      })
      .catch(err => {
        console.log("err", err);
      });
  }

 



  placeOrder() {
    let loader = this.loadingCtrl.create({
      content: "Placing Order.."
    });
    loader.present();
    var user = firebase.auth().currentUser;
    if (user) {
      let orderObj = {
        customerId: user.uid,
        name: this.customerName,
        shipping: this.shippingFee,
        orderAmount: this.productAmt,
        amount: this.totalAmount,
        orders: this.cartItems
       
      };

      this.orderService.placeOrder(orderObj).then(() => {
        loader.dismiss();

        console.log('Ordine Confermato per',this.customerName,orderObj);
       
        this.navCtrl.setRoot('HomePage');
        window.localStorage.clear();
        this.cartService.removeAllCartItems();
       
      });
    } else {
      loader.dismiss();
    }

}
  
 

  removeAllCartItems() {
    return this. removeAllCartItems()}




}
