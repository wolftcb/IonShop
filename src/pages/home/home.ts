import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { EmailService } from '../../providers/services/email.service';
import { CallService } from '../../providers/services/call.service';
import { MapsService } from '../../providers/services/maps.service';
import { InAppBrowserService } from '../../providers/services/in-app-browser.service';
import { data } from './home-data';

import { Tile } from './models/tile.model';
import { CategoryPageModule } from '../category/category.module';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public tiles: Tile[][];

  promoSliders: any[];
  products: any[];
  productRows:any;
  promoImagesLoaded:boolean=false;
  private emailService: EmailService;
  private callService: CallService;
  private mapsService: MapsService;
  private browserService: InAppBrowserService;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService: ProductsProvider,
    private loadingCtrl: LoadingController,
    emailService: EmailService,
		callService: CallService,
    mapsService: MapsService,
    browserService: InAppBrowserService,
    private events: Events,private nativePageTransitions: NativePageTransitions) {
      this.emailService = emailService;
      this.callService = callService;
      this.mapsService = mapsService;
      this.browserService = browserService;
     this.initTiles();
  }
  

  ionViewWillEnter() {
    this.loadPromo();
    this.loadProducts();
  }

  ionViewDidLeave() {
    this.events.unsubscribe('promoLoaded');
  }



  ionViewWillLeave() {

    let options: NativeTransitionOptions = {
       direction: 'up',
       duration: 500,
       slowdownfactor: 3,
       slidePixels: 20,
       iosdelay: 100,
       androiddelay: 150,
       fixedPixelsTop: 0,
       fixedPixelsBottom: 60
      };
   
    this.nativePageTransitions.slide(options)
      .then(()=>{

      })
      .catch(()=>{

      });
   
   }

   

  ionViewDidLoad() {

  }

  loadPromo() {
    let loader = this.loadingCtrl.create({
      content: 'Loading Promos..'
    });
    loader.present();
    this.productService.getPromoSlider();

    this.events.subscribe('promoLoaded', () => {
      this.promoSliders = this.productService.promos;
      if(this.promoSliders.length>0){
        this.promoImagesLoaded =true;
      }
      loader.dismiss();
    })
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
      fixedPixelsBottom: 60
     };
    this.nativePageTransitions.slide(options);
    this.navCtrl.push("SinglePage",{product:product});    
  }
  

  public getDirections() {
		this.mapsService.openMapsApp(data.officeLocation);
	}

	public sendEmail() {
		this.emailService.sendEmail(data.email);
	}

	public openFacebookPage() {
		this.browserService.open(data.facebook);
	}

	public callUs() {
		this.callService.call(data.phoneNumber);
	}
	private initTiles(): void {
		this.tiles = [[{
		
	
			title: 'Slide',
			path: 'categorypage',
			icon: 'swap',
			component: CategoryPageModule
		}]];
  }
  showRegisterPage() {
    this.navCtrl.push("CategoryPage");
  }
 
}

