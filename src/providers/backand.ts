
import {Injectable} from '@angular/core';
import {Headers,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Http} from "@angular/http";
import {Observable} from "rxjs";


@Injectable()
export class Backand {
  auth_token: {header_name: string, header_value: string} = {header_name: 'AnonymousToken', header_value: 'de9979af-d49f-4ce2-bfe5-23e5b05f10aa'};
  api_url: string = 'https://api.backand.com';
  app_name: string = 'sampu';

  data: any;
  key:string='&key=AIzaSyD_SjvE2iNaEE8gjynWk9KLDJPvXMDrvNc';
  userlat:any;
  userlng:any;

  constructor(public http: Http) {
       this.data = null;
  }

  private authHeader() {
    var authHeader = new Headers();
    authHeader.append(this.auth_token.header_name, this.auth_token.header_value);

    return authHeader;
  }

  public addQuestionP(question,importance,subjectid,createdAt,updatedAt,chapterID) {
     return this.http.get(this.api_url + '/1/query/data/AddQuestionsToDB?parameters=%7B%22question%22:%22%5C%22'+question+'%5C%22%22,%22importance%22:%22'+importance+'%22,%22subjectid%22:%22'+subjectid+'%22,%22createdAt%22:%22'+createdAt+'%22,%22updatedAt%22:%22'+updatedAt+'%22,%22chapterID%22:%22'+chapterID+'%22%7D', {
       headers: this.authHeader()
     })
       .map(res => res.json())
 }

 public updateShuttleLoc(id,driverlat,driverlong) {
    return this.http.get(this.api_url + '/1/query/data/updateshuttle?parameters=%7B%22id%22:%22%5C%22'+id+'%5C%22%22,%22driverlat%22:%22'+driverlat+'%22,%22driverlong%22:%22'+driverlong+'%22%7D', {
      headers: this.authHeader()
    })
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
       Geolocation.getCurrentPosition(options).then((resp) => {
         this.userlat = resp.coords.latitude;
         this.userlng = resp.coords.longitude;
         console.log(this.userlat)
       }).catch((error) => {
         console.log('Error getting location', error);
       });
     }

}
