import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';


@Injectable()
export class NodeJsService {

 // hämtar värdena från min Node App


  constructor(private http: Http) { }


  getMovieNews() {
    return this.http.get('https://moviefinderapp.herokuapp.com/newsScraping')
      .map(res => res.json())
  }


  getEvents() {
    return this.http.get('https://moviefinderapp.herokuapp.com/eventApi')
      .map(res => res.json())
  }


}


