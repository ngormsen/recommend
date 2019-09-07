import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AmazonService {
  private _url: string = "https://api.diffbot.com/v3/product?token=7939f6f8dec8b7df65018695868ddbd2&url=http%3A%2F%2Fstore.diffbot.com";
  constructor(private http: HttpClient) {
    console.log(this.getData()) 
    console.log("hello world")
   }

   getData(){
     return this.http.get(this._url);
   }

}
