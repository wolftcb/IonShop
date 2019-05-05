import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import firebase from "firebase";


@Injectable()
export class AuthProvider {
 clienti = firebase.database().ref('/customers');
 
  constructor(public events: Events) {}
/*
Questo servizio ha tre metodi: login, registerUser e getuserdetails. 

*/
  login(loginParams){
    
    var promise = new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(loginParams.email, loginParams.password)
      //Il primo argomento di .then è una funzione che: viene eseguito quando la promessa viene risolta e riceve il risultato. 
      .then(() => {
        //resolve(value) - per indicare che il lavoro è terminato correttamente:
        resolve(true);
      })
      .catch((err) => {
        //reject(error) - per indicare che si è verificato un errore
        reject(err);
       })
    })
//return promise se utente è loggato
    return promise;
  }

  registerUser(userObj: any) {
    var promise = new Promise((resolve, reject) => {
      //Crea un nuovo account passando l'indirizzo email e la password del nuovo utente per createUserWithEmailAndPassword :
      firebase .auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .then(() => {
          this.clienti.child(firebase.auth().currentUser.uid).set({
            name:userObj.name,
            address:userObj.address,
            email:userObj.email
          }).then(()=>{
            resolve({ success: true });
          }).catch((err)=>{
            reject(err);
          })
         // resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    })
    return promise;
  }

  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
    this.clienti.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      
      })
    })
    return promise;
}

}




