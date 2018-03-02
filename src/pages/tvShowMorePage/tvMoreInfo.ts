import { Component } from '@angular/core';
import {NavParams, ToastController, NavController, LoadingController} from 'ionic-angular';
import {TvShowService} from "../../services/tv.service";
import {TmdbService} from "../../services/favorites.service";
import { DomSanitizer} from '@angular/platform-browser';
import {fadeInAnimation} from "../../shared/animations/fadeIn.animation";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tvMore',
  templateUrl: 'tvMoreInfo.html',
  animations: [fadeInAnimation]
})
export class TvShowMorePage {

  tvShow: Object;
  rating: Object;
  isStarred = false;
  relatedShows: Array<Object>;
  imdbId: Array<Object>;
  favorites = [];
  tmdbTvShows: Object;
  toggle = false;
  favorite: boolean;
  constructor(private _tvShowService: TvShowService, public navParams: NavParams,private tmdbService: TmdbService, private toastCtrl: ToastController,  private _sanitizer: DomSanitizer,
              private navCtrl: NavController,public loadingCtrl: LoadingController, private iab: InAppBrowser, public storage: Storage) {

  }

  // samma som på movieMoreInfo fast Tv-shows


  ngOnInit() {


    this._tvShowService.getImdbRating(this.navParams.get('id')).subscribe((params) => {
      let id = params['id'];
      this._tvShowService.getImdbRating(id).subscribe(rating => {
        console.log(rating);
        this.rating = rating;
      })
    });


    this.getShows();
    this.getRelatedShows();
    this.getImdbId();
    this.getTmdbTvShows();
    this.isFav();

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
    this.navCtrl.push(TvShowMorePage, {id});

  }

  getShows(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`
    });

    loading.present();


    this._tvShowService.getTvShow(this.navParams.get('id')).subscribe((params) => {
      let id = params['id'];
      this._tvShowService.getTvShow(id).subscribe(tvShow => {
        console.log(tvShow);
        this.tvShow = tvShow;
        loading.dismiss();
      })
    });

  }

  getRelatedShows(){
    this._tvShowService.getSimilarShow(this.navParams.get('id')).subscribe((params) => {
      let id = params['id'];
      this._tvShowService.getSimilarShow(id).subscribe(relatedTvShow => {
        console.log(relatedTvShow);
        this.relatedShows = relatedTvShow;
      })
    });
  }

  getImdbId(){
    this._tvShowService.getImdbId(this.navParams.get('id')).subscribe((params) => {
      let id = params['id'];
      this._tvShowService.getImdbId(id).subscribe(imdb => {
        console.log(imdb);
        this.imdbId = imdb;
      })
    });
  }


  fav(seriesId) {
    this.tmdbService.getTmdbTvShows(seriesId).subscribe(series => {
      this.storage.set(seriesId, series);
      this.favorite = true;
      this.presentToastSuccess();
    });
}

removeFav(seriesId) {
  this.storage.remove(seriesId);
  this.favorite = false;
  this.presentToastRemove();
}

isFav() {
  this.tmdbService.getTmdbTvShows(this.navParams.get('id')).subscribe((params) => {
    let id = params['id'];
    this.tmdbService.getTmdbTvShows(id).subscribe(series => {
      this.storage.get(series.id).then((value) => {
        value ? this.favorite = true : this.favorite = false
      }).catch(() => this.favorite = false);
    });
    });
}



  // 1. Hämtar den korrekta tv-showen som användaren för nuvarande vill veta mer om, detta för att sedan kunna lägga in tv-showens id i användarens favoriter om han vill spara den.
  getTmdbTvShows() {
    this.tmdbService.getTmdbTvShows(this.navParams.get('id')).subscribe((params) => {
      let id = params['id'];
      this.tmdbService.getTmdbTvShows(id).subscribe(tvshow => {
        console.log(tvshow);
        this.tmdbTvShows = tvshow;
        // 2. Hämta användarens favoriter
        this.getUserFavorites();
      });
    });
  }


  // 2 Hämta användarens favoriter detta för att se ifall användaren redan sparat tv-showen han är inne på, i stort sätt för att göra stjärnan i navbaren gul eller inte.
  getUserFavorites() {
    this.tmdbService.getUsersFavoriteTvShows()
      .subscribe(favorites => {
        this.favorites = favorites;
        // 3. Metod för att se ifall tv-showen som användaren är inne på matchar nån av dom som ligger i användarens favoriter i firebase.
        this.seeIfStar();
      });
  }


  // 3. Metod för att se ifall tv-showen som användaren är inne på matchar nån av dom som ligger i användarens favoriter i firebase.
  seeIfStar() {
    this.tmdbService.getTmdbTvShows(this.navParams.get('id')).subscribe((params) => {
      let id = params['id'];
      this.tmdbService.getTmdbTvShows(id).subscribe(tvshow => {
        console.log(tvshow);
        this.tmdbTvShows = tvshow;

        for (const favorite of this.favorites) {
          if (+favorite.$key === tvshow.id) {
            this.toggle = true; // gör togglen aktiv ifall tv-showen finns i favoriter
          }
        }
      });
    });
  }


  // Växla stjärnans status och uppdatera användarnas favoriter
  onStarTvShow(tvshow) {
    this.toggle = !this.toggle;
    if (this.toggle) {
      this.tmdbService.postTvShow(tvshow);
      this.presentToastSuccess();
    } else {
      this.tmdbService.removeFavoriteTvShowById(tvshow.id);
      this.presentToastRemove();
    }
  }

}
