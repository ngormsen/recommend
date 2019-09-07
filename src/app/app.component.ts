import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recommend';
  private _url: string = "https://api.diffbot.com/v3/product?token=7939f6f8dec8b7df65018695868ddbd2&url=https://www.amazon.com/gp/video/detail/B072LP3L59/ref=atv_mv_hom_1_c_D4dtpS_2_1";
  constructor(private http: HttpClient) {
    this.getData() 
   }

   getData(){
     return this.http.get(this._url).subscribe(result =>{
       console.log(result)
     });
   }
}
