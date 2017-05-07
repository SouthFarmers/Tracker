import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingController, ToastController, NavParams} from "ionic-angular";
import {Backand} from "../../providers/backand";

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
  public driverlat: any;
  public driverlng: any;
  loader:any;
  shuttle:any;

  constructor(public loadingCtrl: LoadingController, private toastCtrl: ToastController, public back : Backand,
              public navParams: NavParams) {

    this.shuttle = navParams.get('shuttle');
    this.latitude_user = this.back.userlat;
    this.longitude_user = this.back.userlng;
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

    this.back.getShuttleLocation(this.shuttle).subscribe((data) => {
      this.driverlat = data.lat;
      this.driverlng = data.lng;
      this.initMap();
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

    this.back.getDistance(this.latitude_user, this.longitude_user, this.driverlat, this.driverlng).then(res => {
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
