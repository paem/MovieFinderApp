import { Component } from '@angular/core';
import {NavParams, ToastController, NavController, LoadingController} from 'ionic-angular';
import {MovieService} from "../../services/movie.service";
import {TmdbService} from "../../services/favorites.service";
import { DomSanitizer } from '@angular/platform-browser';
import {fadeInAnimation} from "../../shared/animations/fadeIn.animation";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-movieMore',
  templateUrl: 'movieMoreInfo.html',
  animations: [fadeInAnimation],
})
export class MovieMorePage {

  movie:Object;
  relatedMovies: Array<Object>;
  externalInfo: Array<Object>;
  movieVideo: Object;
  isStarred = false;
  favorites = [];
  tmdbMovies: Object;
  toggle = false;
  isLoading = false;
  favorite: boolean;

  constructor(private _movieService: MovieService, public navParams: NavParams, private tmdbService: TmdbService,
              private toastCtrl: ToastController, private _sanitizer: DomSanitizer, private navCtrl : NavController,public loadingCtrl: LoadingController, private iab: InAppBrowser, public storage: Storage) {

  }

  // samma som på tvMoreInfo fast filmer


  ngOnInit(){

    this.getMovies();
    this.getSimilarMovies();
    this.getTmdbMovies();
    this.isFav();
   // this.getExternalInfo();
  }

  createInAppBrowser(link:string){
    this.iab.create(`${link}`);
  }

  getBackground (image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);

  }

  presentToastSuccess() {
    let toast = this.toastCtrl.create({
      message: 'Successfully added to favorites!',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  presentToastRemove() {
    let toast = this.toastCtrl.create({
      message: 'Succesfully removed from favorites!',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  goToMoreInfo(id) {
    this.navCtrl.push(MovieMorePage, {id});
  }

  getMovies(){
    this._movieService.getMovie(this.navParams.get('id')).subscribe((params) => {
      let id = params['id'];
      this._movieService.getMovie(id).subscribe(movie => {
        console.log(movie);
        this.movie = movie;
      });
    });
  }


  getSimilarMovies(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`
    });

    loading.present();

    this._movieService.getSimilarMovie(this.navParams.get('id')).subscribe((params) => {
      let id = params['id'];
      this._movieService.getSimilarMovie(id).subscribe(related => {
        console.log(related);
        this.relatedMovies = related;
        console.log(this.relatedMovies);
        loading.dismiss();
      });

    });

  }

  fav(movieId) {
      this.tmdbService.getTmdbMovies(movieId).subscribe(movie => {
        this.storage.set(movieId, movie);
        this.favorite = true;
        this.presentToastSuccess();
      });
  }
  
  removeFav(movieId) {
    this.storage.remove(movieId);
    this.favorite = false;
    this.presentToastRemove();
  }
  
  isFav() {
    this.tmdbService.getTmdbMovies(this.navParams.get('id')).subscribe((params) => {
      let id = params['id'];
      this.tmdbService.getTmdbMovies(id).subscribe(movie => {
        this.storage.get(movie.id).then((value) => {
          value ? this.favorite = true : this.favorite = false
        }).catch(() => this.favorite = false);
      });
      });
  }


  // 1. Hämtar den korrekta filmen som användaren för nuvarande vill veta mer om från TMBDs api, detta för att sedan kunna lägga in filmens id i användarens favoriter om han vill spara den.
  getTmdbMovies() {
    this.tmdbService.getTmdbMovies(this.navParams.get('id')).subscribe((params) => {
      let id = params['id'];
      this.tmdbService.getTmdbMovies(id).subscribe(movie => {
        this.tmdbMovies = movie;

        // 2. Hämta användarens favoriter
        this.getUserFavorites();
      });
      });
  }


  // 2 Hämta användarens favoriter detta för att se ifall användaren redan sparat filmen han är inne på, i stort sätt för att göra stjärnan i navbaren gul eller inte.
  getUserFavorites() {
    this.tmdbService.getUsersFavoriteMovies()
      .subscribe(favorites => {
        this.favorites = favorites;
        // 3. Metod för att se ifall filmen som användaren är inne på matchar nån av dom som ligger i användarens favoriter i firebase.
        this.seeIfStar();
      });
  }


  // 3. Metod för att se ifall filmen som användaren är inne på matchar nån av dom som ligger i användarens favoriter i firebase.
  seeIfStar() {
    this.tmdbService.getTmdbMovies(this.navParams.get('id')).subscribe((params) => {
      let id = params['id'];
      this.tmdbService.getTmdbMovies(id).subscribe(movie => {
        this.tmdbMovies = movie;

        for (const favorite of this.favorites) {
          if (+favorite.$key === movie.id) {
            this.toggle = true; // gör togglen aktiv ifall filmen finns i favoriter
          }

        }
      });
    });



  }

  // Växla stjärnans status och uppdatera användarnas favoriter
  onStarMovie(movie) {
    this.toggle = !this.toggle;
    if (this.toggle) {
      this.tmdbService.postMovie(movie);
      this.presentToastSuccess();
    } else {
      this.tmdbService.removeFavoriteById(movie.id);
      this.presentToastRemove();
    }
  }






}
