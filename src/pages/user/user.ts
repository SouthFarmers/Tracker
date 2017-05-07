import {Component, ElementRef, ViewChild} from '@angular/core';
import {Distance} from "../../providers/distance";

import {Database} from '@ionic/cloud-angular';
import {LoadingController, ToastController} from "ionic-angular";

declare var google;
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  location: any;
  latitude_user: any;
  longitude_user: any;
  watch_user: any;
  title: any = 'user';
  public driverlat: number = 0;
  public driverlng: number = 0;
  loader:any;

  constructor(public dist: backand,public loadingCtrl: LoadingController, private toastCtrl: ToastController) {


    /*this.db.connect();*/
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
    this.latitude_user = this.dist.userlat;
    this.longitude_user = this.dist.userlng;

    this.db.onConnected().subscribe( (status) => {

      this.db.collection('users').find('driver1').fetch().defaultIfEmpty().subscribe(
        (msg) => {
          console.log(msg)
          this.driverlat = msg.latitude;
          this.driverlng = msg.longitude;
          this.initMap();
        }
      );

    });

    this.db.onSocketError().subscribe( (status) => {
      // Display connecting spinner
      console.log(status.type); // reconnecting
      this.loader.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Something went wrong!',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });

  }

  initMap() {
    console.log(this.latitude_user, this.longitude_user);
    console.log(this.driverlat, this.driverlng);
    let pointA = new google.maps.LatLng(this.latitude_user, this.longitude_user);
    let pointB = new google.maps.LatLng(this.driverlat, this.driverlng);
    let mapOptions = {
      center: pointA,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      zoomControl: true
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map
    });
    this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

    this.dist.getDistance(this.latitude_user, this.longitude_user, this.driverlat, this.driverlng).then(res => {
      this.location = "Shuttle is " + res.distance.text + " away, " + res.duration.text + " to reach";
      this.title = res.distance.text + " ," + res.duration.text + " away";
    })
    this.loader.dismiss();

  }

  calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
    directionsService.route({
      origin: pointA,
      destination: pointB,
      avoidTolls: true,
      avoidHighways: false,
      travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}
