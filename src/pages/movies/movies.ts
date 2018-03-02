import {Component, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {LoadingController, NavController, Slides} from 'ionic-angular';
import {MovieMorePage} from '../movieMoreInfo/movieMoreInfo';
import {fadeInAnimation} from "../../shared/animations/fadeIn.animation";

@Component({

  selector: 'page-movies',
  templateUrl: 'movies.html',
  animations: [fadeInAnimation],
})

export class MoviesPage implements OnInit {

  @ViewChild(Slides) slides: Slides;
  public choosesegment : string = '1';
  popularList: Array<Object>;
  popularList2: Array<Object>;
  popularList3: Array<Object>;
  popularList4: Array<Object>;
  upcomingList: Array<Object>;
  upcomingList2: Array<Object>;
  upcomingList3: Array<Object>;
  upcomingList4: Array<Object>;
  searchResult: Array<any>;
  movie: Object;
  public toggled: boolean;


  constructor(private _movieService: MovieService, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.toggled = false;
  }

  ngOnInit() {
      this.getPopularMovies();
  }


  TabChanges() {
    let len: number = this.slides.length();
    let currentIndex = this.slides.getActiveIndex();
    if (len > 0) {
      if (this.choosesegment === '1') {
        if (currentIndex != 0) {
          this.slides.slideTo(0);

        }
      }
      else if (this.choosesegment === '2') {
        if (currentIndex != 1) {
          this.slides.slideTo(1);

        }
      }
    }
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();

    if (currentIndex == 0) {
      this.choosesegment = '1';
      this.getPopularMovies();
    }
    else if (currentIndex == 1) {
      this.choosesegment = '2';
      this.getUpComingMovies();
    }
  }

  toggleSearch() {
    this.toggled = this.toggled ? false : true;
  }

  cancelSearch(){
    this.toggled = false;
    this.searchResult = null;
  }

  goToMoreInfo(id) {
    this.navCtrl.push(MovieMorePage, {id});
  }

  getPopularMovies(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box loading"></div>
      </div>`
    });

    loading.present();

    this._movieService.getPopular().subscribe(res => {
      this.popularList = res.results;
      console.log(res);
    });
    this._movieService.getPopular2().subscribe(res => {
      this.popularList2 = res.results;
      console.log(res);
    });
    this._movieService.getPopular3().subscribe(res => {
      this.popularList3 = res.results;
      console.log(res);
    });
    this._movieService.getPopular4().subscribe(res => {
      this.popularList4 = res.results;
      console.log(res);
      loading.dismiss();
    });
  }

  getUpComingMovies(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box loading"></div>
      </div>`
    });

    loading.present();

    this._movieService.getUpcoming().subscribe(res => {
      this.upcomingList = res.results;
    });
    this._movieService.getUpcoming2().subscribe(res => {
      this.upcomingList2 = res.results;
    });
    this._movieService.getUpcoming3().subscribe(res => {
      this.upcomingList3 = res.results;
    });
    this._movieService.getUpcoming4().subscribe(res => {
      this.upcomingList4 = res.results;
      loading.dismiss();
    });
  }

  searchMovies(event, key) {
    if(event.target.value.length > 2) {
      this._movieService.searchMovies(event.target.value).subscribe(
        data => {
          this.searchResult = data.results;
          console.log(data);
        },
        err => {
          console.log(err);
        },
        () => console.log('Movie Search Complete')
      );
    }
    if (event.target.value.length == 1){
      this.searchResult = null;
    }

  }


}
