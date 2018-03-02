import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MoviesPage } from '../pages/movies/movies';
import {MovieMorePage} from '../pages/movieMoreInfo/movieMoreInfo';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/favoriteTabs/tabs';
import { AuthPage} from '../pages/auth/auth';
import {FirebaseService} from "../services/firebase.service";
import {JsonpModule} from '@angular/http';
import {MovieService} from '../services/movie.service';
import {SafePipe} from '../services/pipes/safe';
import {TvShowService} from "../services/tv.service";
import {TvShowMorePage} from '../pages/tvShowMorePage/tvMoreInfo';
import {TvShowsPage} from '../pages/tv-shows/tvShows';
import {NodeJsService} from '../services/nodejs.service';
import { AngularFireModule } from 'angularfire2';
import {FavoriteMoviesPage} from '../pages/favorites/favoriteMovies/favoriteMovies';
import {FavoriteTVShowsPage} from '../pages/favorites/favoriteTVShows/favoriteTVShows';
import {TmdbService} from '../services/favorites.service'
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {MovieNewsPage} from '../pages/news/movieNews/movieNews';
import { SuperTabsModule } from 'ionic2-super-tabs';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyC0h05-j2S6jrXYg5iSMBUv0Xy9NOpP3SU",
  authDomain: "moviefinder-5539f.firebaseapp.com",
  databaseURL: "https://moviefinder-5539f.firebaseio.com",
  projectId: "moviefinder-5539f",
  storageBucket: "moviefinder-5539f.appspot.com",
  messagingSenderId: "280676322269"
};

@NgModule({
  declarations: [
    MyApp,
    MoviesPage,
    MovieMorePage,
    HomePage,
    TabsPage,
    AuthPage,
    SafePipe,
    TvShowMorePage,
    TvShowsPage,
    FavoriteMoviesPage,
    FavoriteTVShowsPage,
    MovieNewsPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    JsonpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    LazyLoadImageModule,
    SuperTabsModule

  ],
  exports: [
    MovieMorePage,
    TvShowMorePage,

  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MoviesPage,
    HomePage,
    TabsPage,
    AuthPage,
    MovieMorePage,
    TvShowMorePage,
    TvShowsPage,
    FavoriteMoviesPage,
    FavoriteTVShowsPage,
    MovieNewsPage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseService,MovieService,TvShowService,NodeJsService,TmdbService,InAppBrowser
  ]
})
export class AppModule {}
