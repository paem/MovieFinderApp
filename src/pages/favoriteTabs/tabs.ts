import { Component } from '@angular/core';
import {FavoriteTVShowsPage} from "../favorites/favoriteTVShows/favoriteTVShows";
import {FavoriteMoviesPage} from "../favorites/favoriteMovies/favoriteMovies";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = FavoriteMoviesPage;
  tab2Root: any = FavoriteTVShowsPage;


  constructor() {

  }
}
