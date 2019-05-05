import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import firebase from 'firebase';

@Injectable()
export class ProductsProvider {
  promoRef = firebase.database().ref("promotions");
  productFire = firebase.database().ref("products");
  Arrpromos: Array<any> = [];
  products:Array<any> =[];
  constructor(public events: Events) {

  }
//Promotions getPromoSlider che recupera le immagini della id promotins da Firebase
  getPromoSlider() {
    this.promoRef.once('value', (snap) => {
      this.Arrpromos = [];
      if (snap.val()) {
        var tempPromo = snap.val();
        for (var key in tempPromo) {
          let Promoslide = {
            id: key,
            name: tempPromo[key].thumb
          };

          this.Arrpromos.push(Promoslide);
        }
      }
      this.events.publish('promoLoaded');
    });
  }


 
// tutti i prodotti
  getProducts() {
    this.productFire.once('value', (snap) => {
      this.products = [];
      if (snap.val()) {
        var tempProducts = snap.val();
        for (var key in tempProducts) {
          let singleProduct = {
            id:key,
            category_id: tempProducts[key].category_id,
            name: tempProducts[key].name,
            images:tempProducts[key].images,
            price:tempProducts[key].price,
            sale_price:tempProducts[key].sale_price,
            short_description:tempProducts[key].short_description,
            thumb:tempProducts[key].thumb
          };

          this.products.push(singleProduct);
        }
      }
      this.events.publish('productsLoaded');
    });
  }

}
