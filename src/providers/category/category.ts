import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import firebase from 'firebase';

@Injectable()
export class CategoryProvider {

  categoriesRef = firebase.database().ref("categories");
  
  categories: Array<any> = [];
  
  constructor(public events: Events) {

  }

  getCategories(){
    /*
    Questo metodo sta prendendo il tipo di evento come "valore" e quindi recupera l' istantanea dei dati. 
    Quando aggiungiamo il metodo val () all'istantanea, otterremo la rappresentazione JavaScript dei dati.
    */
    this.categoriesRef.once('value', (snapshot) => {
      this.categories = [];
      if (snapshot.val()) {
        var tempCategories = snapshot.val();
        for (var key in tempCategories) {
          let singleCategory = {
            id: key,
            name: tempCategories[key].name,
            thumb:tempCategories[key].thumb
          };

          this.categories.push(singleCategory);
        }
      }
      this.events.publish('categoryLoaded');
    });
  }

}
