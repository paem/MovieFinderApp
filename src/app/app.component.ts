import {Component, ViewChild} from '@angular/core';
import {Platform, NavController, LoadingController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/favoriteTabs/tabs';
import { AuthPage} from "../pages/auth/auth";
import {FirebaseService} from "../services/firebase.service";
import * as firebase from 'firebase';
import {MoviesPage} from "../pages/movies/movies";
import {HomePage} from "../pages/home/home";
import {TvShowsPage} from "../pages/tv-shows/tvShows";
import {AngularFire} from 'angularfire2';
import {MovieNewsPage} from "../pages/news/movieNews/movieNews";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('mycontent') nav: NavController;
  isAuthenticated = false;
  rootPage: any = HomePage;
  authPage = AuthPage;
  activePage: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(platform: Platform, private firebaseService: FirebaseService, private af: AngularFire,  public loadingCtrl: LoadingController) {

    // Sidorna i sidebar-menyn
    this.pages = [
      { title: 'Home', component: HomePage, icon: "home"},
      { title: 'Movies', component: MoviesPage, icon: "film"},
      { title: 'TV-Shows', component: TvShowsPage, icon: "easel"},
      { title: 'Favorites', component: TabsPage, icon: "bookmarks"},
      { title: 'News', component: MovieNewsPage, icon: "paper"},

];
    this.activePage = this.pages[0];

        // Auth State
  /*  firebase.auth().onAuthStateChanged(user => {
      console.log("STATE CHANGE", user);
      if (user) {
        console.log("AUTHED");
        this.isAuthenticated = true;
        this.rootPage = HomePage;
      } else {
        console.log("NOT AUTHED");
        this.isAuthenticated = false;
        this.rootPage = AuthPage;
      }
    });
*/





    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  onLoadPage(page: any){
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  //kollar vilken sida användaren befinner sig på och highlightar namnet på sidebar-menyn
  checkActive(page){
    return page == this.activePage;
}


/*  onSignOut() {
    this.firebaseService.signOut();
    this.nav.setRoot(AuthPage);
  }
*/
}
