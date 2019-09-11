import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface IMovieDataApi{
  Response: string,
  Search: IMovieApi[]
};

export interface IMovieApi{
  Title: string,
  Year: string,
  Poster: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {

  movieData$ : BehaviorSubject<IMovieApi[]> = new BehaviorSubject<IMovieApi[]>([]);
  private _urlOmdb: string = ""

  constructor(private http: HttpClient) {
   }

   fetchMovieData(title: string): void{
    this._urlOmdb = `http://www.omdbapi.com/?apikey=b192c98a&s=${title}`
    this.http.get(this._urlOmdb).subscribe(({Response: response, Search: movies}: IMovieDataApi) =>{
      if(response != "False"){
          this.movieData$.next(movies);
      }
    });
  }

  // fetchMovieData(title: string): void{
  //   this._urlOmdb = `http://www.omdbapi.com/?apikey=b192c98a&s=${title}`
  //   let options = [];
  //   this.http.get(this._urlOmdb).subscribe(results =>{
  //     if(results['Response'] != "False"){
  //         for(let result in results['Search']){
  //           options.push(results['Search'][result].Title);
  //         }
  //         // TODO subscribe/return the value 
  //         this.movieData$.next(options);
  //     }
  //   });
  // }
};


