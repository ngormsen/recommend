import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recommend';
  private _url: string = 'http://www.omdbapi.com/?apikey=b192c98a&s=batman'
  constructor(private http: HttpClient) {
    this.getData() 
   }

   getData(){
     return this.http.get(this._url).subscribe(result =>{
       console.log(result)
     });
   }
}
