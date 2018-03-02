import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class MovieService{

  // här finns olika metoder som utför queries på TMBDs api där jag hämtar filmer som sedan ska visas upp

    apiKey: string;
    trailerKey: string;


    constructor(private _jsonp:Jsonp){
        this.apiKey = '4c573be337dfa22f6039477b86fcb03f';
        this.trailerKey = 'Official Trailer';

        console.log('MovieService Initialized...');


    }

    getPopular(){
        return this._jsonp.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK&sort_by=popularity.desc&page=1&api_key='+this.apiKey)
            .map(res => res.json());
    }

    getPopular2(){
        return this._jsonp.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK&sort_by=popularity.desc&page=2&api_key='+this.apiKey)
            .map(res => res.json());
    }

    getPopular3(){
        return this._jsonp.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK&sort_by=popularity.desc&page=3&api_key='+this.apiKey)
            .map(res => res.json());
    }

    getPopular4(){
        return this._jsonp.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK&sort_by=popularity.desc&page=4&api_key='+this.apiKey)
            .map(res => res.json());
    }

    getUpcoming(){
        return this._jsonp.get('https://api.themoviedb.org/3/movie/upcoming?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&language=en-US&page=1')
            .map(res => res.json());
    }

    getUpcoming2(){
        return this._jsonp.get('https://api.themoviedb.org/3/movie/upcoming?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&language=en-US&page=2')
            .map(res => res.json());
    }

    getUpcoming3(){
        return this._jsonp.get('https://api.themoviedb.org/3/movie/upcoming?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&language=en-US&page=3')
            .map(res => res.json());
    }

    getUpcoming4(){
        return this._jsonp.get('https://api.themoviedb.org/3/movie/upcoming?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&language=en-US&page=4')
            .map(res => res.json());
    }



    searchMovies(searchStr: string){
        return this._jsonp.get('https://api.themoviedb.org/3/search/movie?callback=JSONP_CALLBACK&query='+searchStr+'&sort_by=popularity.desc&api_key='+this.apiKey)
        .map(res => res.json());
    }

    getMovie(id:string){
        return this._jsonp.get('https://api.themoviedb.org/3/movie/'+id+'?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&append_to_response=videos&language=en-US')
        .map(res => res.json());
    }

    getVideo(id:string){
       return this._jsonp.get('https://api.themoviedb.org/3/movie/'+id+'/videos?callback=JSONP_CALLBACK&&api_key='+this.apiKey+'&query='+this.trailerKey+'&language=en-US')
         .map(res => res.json());
    }

    getSimilarMovie(id:string){
      return this._jsonp.get('https://api.themoviedb.org/3/movie/'+id+'?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&append_to_response=recommendations&language=en-US')
        .map(res => res.json());
    }


  getExternalInfo(id:string){
    return this._jsonp.get('https://api.themoviedb.org/3/find/'+id+'?callback=JSONP_CALLBACK&api_key='+this.apiKey+'&language=en-US&external_source=imdb_id')
      .map(res => res.json());
  }



}
