import {Injectable} from '@angular/core';
import {Headers,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class Backand {
  auth_token: {header_name: string, header_value: string} = {header_name: 'AnonymousToken', header_value: '90bfb8ca-956b-48fd-ab04-715a5c4e1a7a'};
  api_url: string = 'https://api.backand.com';

  data: any;
  key:string='&key=AIzaSyD_SjvE2iNaEE8gjynWk9KLDJPvXMDrvNc';
  userlat:any;
  userlng:any;

  constructor(public http: Http, private geolocation: Geolocation) {
       this.data = null;
  }

  private authHeader() {
    var authHeader = new Headers();
    authHeader.append(this.auth_token.header_name, this.auth_token.header_value);

    return authHeader;
  }

 public updateShuttleLoc(id,driverlat,driverlong) {

   let data = JSON.stringify({
     "lat": driverlat,
     "lng": driverlong
   });
   return this.http.put(this.api_url + '/1/objects/driver/'+id, data,
       {headers: this.authHeader()})
       .map(res => res.json())

}

public getShuttleLocation(id){
  return this.http.get(this.api_url + '/1/objects/driver/'+id,
    {headers: this.authHeader()})
    .map(res => res.json())

}

   catchError(error:Response){
     return Observable.throw(error.json().error || 'Server error');
   }


   getDistance(userlat,userlng,driverlat,driverlng){
       this.data = null;
       if(this.data){
         return Promise.resolve(this.data);
       }

       return new Promise(resolve => {

         this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+userlat+','+userlng+'&destinations='+driverlat+','+driverlng+this.key).map(res => res.json()).subscribe(data => {
           this.data = data.rows[0].elements[0];
           resolve(this.data);
         });

       });

     }


     getuserLocation(){
       let options = {enableHighAccuracy: true};
       this.geolocation.getCurrentPosition(options).then((resp) => {
         this.userlat = resp.coords.latitude;
         this.userlng = resp.coords.longitude;
       }).catch((error) => {
         console.log('Error getting location', error);
       });
     }

}
