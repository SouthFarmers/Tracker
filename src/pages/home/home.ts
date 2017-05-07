import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DriverPage} from "../driver/driver";
import {UserPage} from "../user/user";
import {Backand} from "../../providers/backand";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedShuttle:any = 1;
  constructor(public navCtrl: NavController, public back:Backand) {
    this.back.getuserLocation();
  }

  driver(){
    this.navCtrl.push(DriverPage);
  }
  user(){
    this.navCtrl.push(UserPage, {
      shuttle : this.selectedShuttle
    });
  }
}
