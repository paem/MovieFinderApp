import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import 'rxjs/Rx';
import {TmdbService} from "../../../services/favorites.service";
import {TvShowMorePage} from "../../tvShowMorePage/tvMoreInfo";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-favoriteTVShows',
  templateUrl: 'favoriteTVShows.html'
})


export class FavoriteTVShowsPage implements OnInit {

  favorites: Object;
  isLoading = false;
  favoriteSeries: any[] = [];

  constructor(private navCtrl: NavController, private tmdbService: TmdbService, public loadingCtrl: LoadingController, public storage: Storage) {}
 

  ngOnInit() {
   // this.getUserFavorites();
    this.getFavoriteSeries();
  }

  goToMoreInfo(id) {
      this.navCtrl.push(TvShowMorePage, {id});
  }

  //hämtar användarens favoriter från firebase i detta fallet Tv-shows
 /* getUserFavorites() {
    this.isLoading = true;
    this.tmdbService.getUsersFavoriteTvShows()
      .subscribe(favorites => {
        this.favorites = favorites;
        console.log(favorites);
        this.isLoading = false;
      });
  }
*/

  getFavoriteSeries(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">Loading...</div>
      </div>`
    });
    loading.present();
    this.storage.forEach( (value, key, index) => {
      if (!value.imdb_id) {
        this.favoriteSeries.push(value);
        console.log(this.favoriteSeries);
      }
    })
    loading.dismiss();
  }

}

