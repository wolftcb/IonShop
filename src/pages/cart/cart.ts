import { Component } from "@angular/core";
import { IonicPage,NavController,NavParams,AlertController} from "ionic-angular";
import { CartProvider } from "../../providers/cart/cart";
import firebase from "firebase";

@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})
export class CartPage {
  /*
1. cartItem di tipo array che terranno gli articoli aggiunti al carrello.
2. totalAmount: di tipo numero che contiene la quantità totale di prodotti nel carrello.
3. isCartItemLoaded di tipo booleano che consente di rilevare se gli articoli del carrello sono stati caricati.
4. isEmptyCart di tipo boolean che aiuterà a rilevare se non ci sono articoli nel carrello
  */
  cartItems: any[] = [];
  totalAmount: number = 0;
  isCartItemLoaded: boolean = false;//vuoto 
  isEmptyCart: boolean = true;//controllo carrello true vuoto
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private cartService: CartProvider  ) {}

  ionViewDidLoad() {
    this.loadCartItems();
  }
  /*
  Il metodo loadCartItems sarà responsabile del caricamento degli articoli nel carrello come suggerisce il nome. 
  La funzione è piuttosto semplice, stiamo solo effettuando una chiamata a getCartItems nel servizio CartProvider, 
  quindi invia l'array restituito di elementi alla variabile cartItems in modo che possiamo utilizzarlo nella nostra pagina cart.html.
  */


  loadCartItems() {
   this.cartService.getCartItems()
    .then(valore => {
      this.cartItems = valore;
      if (this.cartItems.length > 0) {
        this.isEmptyCart = false; // carrello >0 false cquindi ricalcola prezzo
        this.recalculateTotalAmount();
      }
      this.isCartItemLoaded = true;
     
    })
    .catch(() => {});
}
recalculateTotalAmount() {
  let newTotalAmount = 0;
  this.cartItems.forEach( cartItem => {
      newTotalAmount += (cartItem.productPrice * cartItem.count)
  });
  this.totalAmount = newTotalAmount;
}
decreaseProductCount(itm) {
  if (itm.count > 1) {
    itm.count--;}
    else{
      (itm.count=0)

      this.removeItem(itm);
    }
  
}

incrementProductCount(itm) {
  itm.count++;
}
  /*
La funzione è piuttosto semplice, stiamo solo effettuando una chiamata a getCartItems nel servizio CartProvider, quindi invia l'array restituito di elementi alla variabile cartItems in modo che possiamo utilizzarlo nella nostra pagina cart.html.
Quindi controlla anche se l'array restituito ha un record o meno, se ci sono elementi nell'array che si spostano per calcolare l'importo totale scorrendo gli articoli, quindi imposta la variabile isEmptyCart su false.
 */
/*---
L'ultimo metodo nel file .ts è il checkout. Questo sarà chiamato quando si fa clic sul pulsante checko
*/
  checkOut() {
    var user = firebase.auth().currentUser;
    if (user) {
      this.navCtrl.push("CheckoutPage");
    } else {
      this.navCtrl.setRoot("LoginPage");
    }
    /*
    In questo metodo, abbiamo sfruttato l'autenticazione di Firebase per verificare se l'utente corrente è connesso o meno. Se connesso, invia l'utente alla pagina di checkout se l'utente non viene inviato alla pagina di accesso. 
    */
  }
/*
acquirenti siano in grado di rimuovere l'articolo dal carrello, quindi facciamo un altro metodo per gestirlo.
Il metodo chiama semplicemente il metodo removeFromCart nel nostro servizio CartProvider.

*/
 /* removeItem(itm) {
    this.cartService.removeFromCart(itm).then(() => {
      this.loadCartItems();
    });
  } */
  removeItem(itm) {
 
 let alert = this.alertCtrl.create({
      title: 'Rimuovere prodotto',
      message: 'Vuoi rimuovere il prodotto?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('RIMUOVI PRODOTTO');
          }
        },
        {
          text: 'SI',
          handler: () => {
            this.cartService.removeFromCart(itm).then(() => {
              this.loadCartItems();
            });
          }
        }
      ]
    });
    alert.present();
  }
}
