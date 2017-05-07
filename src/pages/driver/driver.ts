import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


/*
  Generated class for the Driver page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html'
})
export class DriverPage {
  divAlpha:any;
  divBullets:any;
  watch:any;
  latitude:any;
  longitude:any;


   selectedShuttle:string = "1";

  constructor(public navCtrl: NavController, public navParams: NavParams) {



  }

  ionViewDidLoad() {
     this.divAlpha = document.getElementById('alpha');
     this.divBullets = document.getElementById('beta');
  }

  startTracking(){

      this.divAlpha.style.display = 'block';
      this.divBullets.style.display = 'none';

    let options = { enableHighAccuracy: true };
    this.watch = Geolocation.watchPosition(options);
    this.watch.subscribe((data) => {

      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;

    /* update query id,driverlat,driverlong */
 /* https://api.backand.com/1/query/data/updateshuttle?parameters=%7B%22id%22:%22%5C%222%5C%22%22,%22driverlat%22:%2255.66%22,%22driverlong%22:%2266.55%22%7D */



/* select query*/
/* https://api.backand.com/1/query/data/getshuttle?parameters=%7B%22id%22:%221%22%7D */

    });

  }

  stopTracking(){
    this.divAlpha.style.display = 'none';
    this.divBullets.style.display = 'block';
    //this.watch.unsubscribe();
  }

}
