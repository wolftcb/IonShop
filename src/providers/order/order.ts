import { Injectable } from "@angular/core";
import firebase from "firebase";

@Injectable()
export class OrderProvider {
  /*
  Fai riferimento agli ordini Firebase e ai dettagli dell'ordine in questo modo:
  */
 
  order = firebase.database().ref("/orders");
  orderDetails = firebase.database().ref("/ordersdetails");
  constructor() {}
/*
metodo pubblico qui sarà il placeOrder che verrà chiamato ogni volta che si fa clic sul pulsante dell'ordine del luogo nella pagina di pagamento
Questo metodo accetta l'oggetto ordine che verrà inviato dalla pagina di checkout. 
Come puoi vedere, si è occupato dei dettagli dell'ordine e dell'ordine.
L'oggetto ordine ha Rif. Ordine, Nome custode, Spedizione e Importo 
mentre l'oggetto dettagli ordine contiene Rif. Ordine, Nome prodotto, Conteggio e l'importo totale. 
C'è solo un metodo privato che ha generato il ref di ordine.
*/ /*
     Questo metodo accetta l'oggetto ordine che verrà inviato dalla pagina di checkout. Come puoi vedere, si è occupato dei dettagli dell'ordine e dell'ordine.

 L'oggetto ordine ha Rif. Ordine, Nome custode, Spedizione e Importo mentre 
l'oggetto dettagli ordine contiene Rif. Ordine, Nome prodotto, Conteggio e l'importo totale. C'è solo un metodo privato che ha generato il ref di ordine.
     */
 
 
     placeOrder(orderObj: any) {
    var promise = new Promise((resolve, reject) => {
     
    var orderRef = this.makeid(5)
   
    let orderObject = {
    orderRef: orderRef,
    customerName:orderObj.name || '',
    ShippingAmt:orderObj.shipping,
    OrderAmt:orderObj.orderAmount,
    totalAmount: orderObj.amount};
    this.order.push(orderObject)
  .then(()=>{
        orderObj.orders.forEach((productId) => {
          
          this.orderDetails.push({
            orderRef: orderRef,
            productName: productId.name,
            Qty: productId.count,
            amount: productId.totalPrice})
            .then(()=>{
            resolve(true);
          })
        });
      })
    
    });
    return promise;
  }

//_________________________________//
  makeid(lenght:number) {
    var text = "";
    var possible =
      "12345";

    for (var i = 0; i < lenght; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
