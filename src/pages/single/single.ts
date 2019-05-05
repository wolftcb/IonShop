import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { CartProvider } from '../../providers/cart/cart';

@IonicPage()
@Component({
  selector: 'page-single',
  templateUrl: 'single.html',
})
export class SinglePage {
  selectProduct: any;
  productCount: number = 1;
  cartItems: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cartService: CartProvider, public toastCtrl: ToastController) {
  

}
  ionViewDidEnter(){
    if(this.navParams.get("product")){
    window.localStorage.setItem('selectedProduct',JSON.stringify(this.navParams.get('product')))
  }
    this.getSingleProduct();
  }
  ionViewDidLoad() {
    this.selectProduct = this.navParams.get("product");
    this.cartService.getCartItems();

  }
  getSingleProduct() {
    if (window.localStorage.getItem('selectedProduct')) {
      this.selectProduct = JSON.parse(window.localStorage.getItem('selectedProduct'))
     
    }
  }

   decreaseProductCount() {
    if (this.productCount > 1) {
      this.productCount--;
    }

  }

  incrementProductCount() {
    this.productCount++;

  }

  addToCart(product) {
    var productPrice = this.productCount * parseInt(product.price);
    let cartProduct = {
      product_id: product.id,
      name: product.name,
      thumb: product.thumb,
      count: this.productCount,
      totalPrice: productPrice
    };
    this.cartService.addToCart(cartProduct).then((val) => {
      this.presentToast(cartProduct.name);
      
    });
  }

///___toast___///
  presentToast(name) {
    let toast = this.toastCtrl.create({
      message: `${name} Aggiunto al carrello`,
      showCloseButton: true,
      
      closeButtonText: 'Carrello'

    });

    toast.onDidDismiss(() => {
      this.navCtrl.push('CartPage');
    });
    toast.present();
  }

  showcartPage() {
    this.navCtrl.push("CartPage");
  }

}
