import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  products: any[];
  productRows:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService:ProductsProvider,private events: Events,private nativePageTransitions: NativePageTransitions) {
    
  }

  ionViewWillEnter() {
   
    this.loadProducts();
  }


  ionViewDidLoad() {

  }

  loadProducts() {
    this.productService.getProducts();
    this.events.subscribe('productsLoaded', () => {
      this.products = this.productService.products;
      this.productRows = Array.from(Array(Math.ceil(this.products.length/2)).keys());
      
    })
  }

 

  
  showDetails(product){
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 90
     };
    this.nativePageTransitions.slide(options);
    this.navCtrl.push("SinglePage",{product:product});    
  }

}
