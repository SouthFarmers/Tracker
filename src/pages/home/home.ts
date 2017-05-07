import { Component } from '@angular/core';
import {Distance} from "../../providers/distance";
import { NavController } from 'ionic-angular';
import {DriverPage} from "../driver/driver";
import {UserPage} from "../user/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

shuttle_num = [1,2,3,4,5,6,7,8,9,10];

 selectedShuttle = this.shuttle_num[0];

  constructor(public navCtrl: NavController, public dist:backand) {
    this.dist.getuserLocation();
  }

  driver(){
    this.navCtrl.push(DriverPage);
  }
  user(){
    this.navCtrl.push(UserPage);
  }
}
