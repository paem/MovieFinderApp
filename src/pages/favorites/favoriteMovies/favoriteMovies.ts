import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import 'rxjs/Rx';
import {TmdbService} from "../../../services/favorites.service";
import {MovieMorePage} from "../../movieMoreInfo/movieMoreInfo";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-favoriteMovies',
  templateUrl: 'favoriteMovies.html'
})


export class FavoriteMoviesPage implements OnInit {

  isLoading = false;
  favorites: Object;

  favoriteMovies: any[] = [];

  constructor(private navCtrl: NavController, private tmdbService: TmdbService, public loadingCtrl: LoadingController,  public storage: Storage) {}

  

  ngOnInit() {
   // this.getUserFavorites();
    this.getFavoriteMovies();
  }

  goToMoreInfo(id) {
      this.navCtrl.push(MovieMorePage, {id});
  }

  //hämtar användarens favoriter från firebase i detta fallet filmer
 /* getUserFavorites() {
    this.isLoading = true;
    this.tmdbService.getUsersFavoriteMovies()
      .subscribe(favorites => {
        this.favorites = favorites;
        console.log(this.favorites);
        this.isLoading = false;
      });
  }
*/

  getFavoriteMovies() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">Loading...</div>
      </div>`
    });
    loading.present();
    this.storage.forEach( (value, key, index) => {
      if (value.imdb_id) {
        this.favoriteMovies.fill;
        this.favoriteMovies.push(value);
        console.log(this.favoriteMovies);
      }
    })
    loading.dismiss();
  }

}
