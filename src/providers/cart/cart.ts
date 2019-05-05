import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
//--STORAGE_KEY--predef//
const CART_KEY = 'cartItems';

@Injectable()
export class CartProvider {

/*
Ionic Storage è il nostro pacchetto go to per gestire facilmente i dati. 
Con Ionic Storage possiamo salvare oggetti JSON e coppie chiave / valore su diversi motori di archiviazione, 
Ionic Storage possiamo chiamare set() o get() ed entrambi restituiranno una Promessa .

*/

  constructor(public storage: Storage) {

  }
  getCartItems() {
    return this.storage.get(CART_KEY);
  }

  addToCart(product) {
    return this.getCartItems().then(result => {
      if (result) {
        //SE NN CI SONO OGGETTI UGUALI
        if (!this.containsObject(product, result)) {
          result.push(product);
          console.log('Prodotto Aggiunto',result);
          return this.storage.set(CART_KEY, result);
        } else {
          let index = result.findIndex(x => x.product_id == product.product_id);
          let prevQuantity = parseInt(result[index].count);
          product.count = (prevQuantity + product.count);
          let currentPrice = (parseInt(product.totalPrice) * product.count);
          product.totalPrice =currentPrice;
           result.splice(index, 1);
          result.push(product);
          console.log('Prodotto Aggiuntoo',result);
          return this.storage.set(CART_KEY, result);
        }

      } else {
        return this.storage.set(CART_KEY, [product]);
      }
    })
  }
  

  removeFromCart(product: { product_id: any; }) {
    return this.getCartItems().then(result => {
    if (result) {
      //foreach JavaScript Array provides the forEach() method that allows you to run a function on every element. The following code uses the forEach() method that is equivalent to the code above.
    result.forEach((item, index) => {
    if (item.product_id === product.product_id) {
    result.splice(index, 1) //rimuove un prodotto alla volta 
    console.log('Prodottorimosso');
    return this.storage.set(CART_KEY, result);
    }
    })
    }
    })
    }

  removeAllCartItems() {
    return this.storage.remove(CART_KEY)
    .then(res => {
      return res;
    });
  }

  //--Controllo --//

  
  containsObject(obj, list): boolean {
    if (list==null) {
      return false;
    }

    if (obj == null) {
      return false;
    }
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].product_id == obj.product_id) {
        return true;
      }
    }
    return false;
  }

}
