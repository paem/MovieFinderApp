import {Http, Jsonp} from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";


@Injectable()
export class TmdbService {

  movies: FirebaseListObservable<any[]>;



  // TMDB Strings
  api_key = '4c573be337dfa22f6039477b86fcb03f';
  other = 'language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';



  constructor(private af: AngularFire, private http: Http, private _jsonp:Jsonp) {
    this.movies = this.af.database.list('/movies');
  }

  uid = firebase.auth().currentUser.uid;

  getTmdbMovies(id:string) {
    return this._jsonp.get('https://api.themoviedb.org/3/movie/'+id+'?callback=JSONP_CALLBACK&api_key='+this.api_key+'&append_to_response=videos&language=en-US')
      .map(res => res.json());
  }

  getTmdbTvShows(id:string) {
    return this._jsonp.get('https://api.themoviedb.org/3/tv/'+id+'?callback=JSONP_CALLBACK&api_key='+this.api_key+'&append_to_response=videos&language=en-US')
      .map(res => res.json());
  }

  // Lägger till en film från tmdb till firebase med tmdbs movie.id som en nyckel.
  // Och lägger också till en associerad nyckel till användarlistan över favoriter.

  postMovie(movie) {
    this.af.database.object('/movies/' + movie.id).update(movie).then(response => { // Om det existerar kommer inget att hända om det inte uppdateras
        this.af.database.object('/users/' + this.uid + '/favorites/movies/' + movie.id).set(true);
      });
  }


  removeFavoriteById(movieId) {
    this.af.database.object('/users/' + this.uid + '/favorites/movies/' + movieId).set(null);
  };


  getUsersFavoriteMovies() {
    return this.af.database.list(`/users/${this.uid}/favorites/movies`)
      .map((favorites) => {
        return favorites.map((favorite) => {
          return this.af.database.object(`/movies/${favorite.$key}`);
        });
      })
      .flatMap((res) => {
        return Observable.combineLatest(res);
      });
  }

  postTvShow(tvshow) {
    this.af.database.object('/tvshows/' + tvshow.id).update(tvshow).then(response => { // Om det existerar kommer inget att hända om det inte uppdateras
      this.af.database.object('/users/' + this.uid + '/favorites/tvshows/' + tvshow.id).set(true);
    });
  }


  removeFavoriteTvShowById(tvshowId) {
    this.af.database.object('/users/' + this.uid + '/favorites/tvshows/' + tvshowId).set(null);
  };

  getUsersFavoriteTvShows() {
    return this.af.database.list(`/users/${this.uid}/favorites/tvshows`)
      .map((favorites) => {
        return favorites.map((favorite) => {
          return this.af.database.object(`/tvshows/${favorite.$key}`);
        });
      })
      .flatMap((res) => {
        return Observable.combineLatest(res);
      });
  }


}
