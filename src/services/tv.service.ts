import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class TvShowService{

  // här finns olika metoder som utför queries på TMBDs api där jag hämtar tv-shows som sedan ska visas upp

  apiKey: string;
  trailerKey: string;
  constructor(private _jsonp:Jsonp){
    this.apiKey = '4c573be337dfa22f6039477b86fcb03f';
    this.trailerKey = 'Official Trailer';
    console.log('TVShowService Initialized...');
  }

  getPopularTvShows(){
    return this._jsonp.get('https://api.themoviedb.org/3/discover/tv?callback=JSONP_CALLBACK&sort_by=popularity.desc&page=1&api_key='+this.apiKey)
      .map(res => res.json());
  }

  getPopularTvShows2(){
    return this._jsonp.get('https://api.themoviedb.org/3/discover/tv?callback=JSONP_CALLBACK&sort_by=popularity.desc&page=2&api_key='+this.apiKey)
      .map(res => res.json());
  }

  getPopularTvShows3(){
    return this._jsonp.get('https://api.themoviedb.org/3/discover/tv?callback=JSONP_CALLBACK&sort_by=popularity.desc&page=3&api_key='+this.apiKey)
      .map(res => res.json());
  }

  getPopularTvShows4(){
    return this._jsonp.get('https://api.themoviedb.org/3/discover/tv?callback=JSONP_CALLBACK&sort_by=popularity.desc&page=4&api_key='+this.apiKey)
      .map(res => res.json());
  }


  getTopRatedShows(){
    return this._jsonp.get('https://api.themoviedb.org/3/tv/top_rated?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&language=en-US&page=1')
      .map(res => res.json());
  }

  getTopRatedShows2(){
    return this._jsonp.get('https://api.themoviedb.org/3/tv/top_rated?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&language=en-US&page=2')
      .map(res => res.json());
  }

  getTopRatedShows3(){
    return this._jsonp.get('https://api.themoviedb.org/3/tv/top_rated?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&language=en-US&page=3')
      .map(res => res.json());
  }

  getTopRatedShows4(){
    return this._jsonp.get('https://api.themoviedb.org/3/tv/top_rated?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&language=en-US&page=4')
      .map(res => res.json());
  }
  searchTvShows(searchStr: string){
    return this._jsonp.get('https://api.themoviedb.org/3/search/tv?callback=JSONP_CALLBACK&query='+searchStr+'&sort_by=popularity.desc&api_key='+this.apiKey)
      .map(res => res.json());
  }

  getTvShow(id:string){
    return this._jsonp.get('https://api.themoviedb.org/3/tv/'+id+'?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&append_to_response=videos&language=en-US')
      .map(res => res.json());
  }

  getImdbRating(imdb_id:string){
    return this._jsonp.get('https://api.themoviedb.org/3/find/'+imdb_id+'?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&language=en-US&external_source=imdb_id')
      .map(res => res.json());
  }


  getVideo(id:string){
    return this._jsonp.get('https://api.themoviedb.org/3/movie/'+id+'/videos?callback=JSONP_CALLBACK&&api_key='+this.apiKey+'&query='+this.trailerKey+'&language=en-US')
      .map(res => res.json());
  }

  getSimilarShow(id:string){
    return this._jsonp.get('https://api.themoviedb.org/3/tv/'+id+'?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&append_to_response=recommendations&language=en-US')
      .map(res => res.json());
  }

  getImdbId(id:string){
    return this._jsonp.get('https://api.themoviedb.org/3/tv/'+id+'/external_ids?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&language=en-US')
      .map(res => res.json());
  }

}
