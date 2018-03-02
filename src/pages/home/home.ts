import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {MovieService} from "../../services/movie.service";
import {MoviesPage} from "../movies/movies";
import {TvShowService} from "../../services/tv.service";
import {TvShowsPage} from "../tv-shows/tvShows";
import {MovieMorePage} from "../movieMoreInfo/movieMoreInfo";
import {TvShowMorePage} from "../tvShowMorePage/tvMoreInfo";
import {NodeJsService} from "../../services/nodejs.service";
import {MovieNewsPage} from "../news/movieNews/movieNews";
import {fadeInAnimation} from "../../shared/animations/fadeIn.animation";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [fadeInAnimation],
})

export class HomePage implements OnInit {

  // allt bör vara self-explanatory


  popularMovieList: Array<Object>;
  popularTvShowList: Array<Object>;
  isLoading = false;

  newsImagess : any;
  newsTitless : any;
  newsDatess : any;
  newsUrlss : any;
  newsArray = [];

  constructor(public navCtrl: NavController, private _movieService: MovieService, private _tvShowService: TvShowService, private nodeService: NodeJsService, public loadingCtrl: LoadingController, private iab: InAppBrowser) {

  }

  ngOnInit(){
    this.getNews();
    this.getPopularMovies();
    this.getPopularTvShows();
  }

  getNews(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box loading"></div>
      </div>`
    });

    loading.present();

    this.nodeService.getMovieNews().subscribe(response => {
      this.newsImagess = response.newsImages;
      this.newsTitless = response.newsTitles;
      this.newsDatess = response.newsDates;
      this.newsUrlss = response.newsUrls;

      for (let _i = 0; _i < this.newsImagess.length; _i++) {
        this.newsArray.push({
          image: this.newsImagess[_i],
          title: this.newsTitless[_i],
          date:   this.newsDatess[_i],
          url:  this.newsUrlss[_i]
        });
      }

      loading.dismiss();


    });

  }

  createInAppBrowser(link:string){
    this.iab.create(`${link}`);
  }

  getPopularMovies(){
    this._movieService.getPopular().subscribe(res => {
      this.popularMovieList = res.results;
    });
  }

  getPopularTvShows(){
    this._tvShowService.getPopularTvShows().subscribe(res => {
      this.popularTvShowList = res.results;
    });
  }

  goToMoreMovieInfo(id) {
      this.navCtrl.push(MovieMorePage, {id});
  }

  goToMoreTvInfo(id) {
      this.navCtrl.push(TvShowMorePage, {id});
  }

  goToNews() {
    this.navCtrl.setRoot(MovieNewsPage);
  }

  goToMovies() {
    this.navCtrl.setRoot(MoviesPage);
  }

  goToTvShows() {
    this.navCtrl.setRoot(TvShowsPage);
  }





}
