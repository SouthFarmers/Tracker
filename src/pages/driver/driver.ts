import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {Backand} from "../../providers/backand";

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


   selectedShuttle:any = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public back: Backand) {



  }

  ionViewDidLoad() {
     this.divAlpha = document.getElementById('alpha');
     this.divBullets = document.getElementById('beta');
  }

  startTracking(){

      this.divAlpha.style.display = 'block';
      this.divBullets.style.display = 'none';

    let options = { enableHighAccuracy: true };
    this.watch = this.geolocation.watchPosition(options).subscribe((data) => {

      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
      this.back.updateShuttleLoc(this.selectedShuttle, this.latitude, this.longitude).subscribe(
        data => {

        },
        err => this.logError(err)
      );

    });

  }

  stopTracking(){
    this.divAlpha.style.display = 'none';
    this.divBullets.style.display = 'block';
    this.watch.unsubscribe
  }

  public logError(err: TemplateStringsArray) {
    console.error('Error: ' + err);
  }

}
