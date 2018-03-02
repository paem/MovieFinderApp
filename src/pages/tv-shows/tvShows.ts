import {Component, OnInit, ViewChild} from '@angular/core';
import {TvShowService} from '../../services/tv.service';
import {LoadingController, NavController, Slides} from 'ionic-angular';
import {TvShowMorePage} from '../tvShowMorePage/tvMoreInfo';
import {fadeInAnimation} from "../../shared/animations/fadeIn.animation";


@Component({

  selector: 'page-tvShows',
  templateUrl: 'tvShows.html',
  animations: [fadeInAnimation],
})

export class TvShowsPage implements OnInit {

  // allt bör vara self-explanatory
  @ViewChild(Slides) slides: Slides;
  public choosesegment : string = '1';
  popularTvShowList: Array<Object>;
  popularTvShowList2: Array<Object>;
  popularTvShowList3: Array<Object>;
  popularTvShowList4: Array<Object>;
  TopRatedShowsList: Array<Object>;
  TopRatedShowsList2: Array<Object>;
  TopRatedShowsList3: Array<Object>;
  TopRatedShowsList4: Array<Object>;
  searchResult: Array<any>;
  public toggled: boolean;


  constructor(private _tvShowService: TvShowService, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.toggled = false;
  }

  ngOnInit() {
     this.getPopularTvShows();
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
      this.getPopularTvShows();
    }
    else if (currentIndex == 1) {
      this.choosesegment = '2';
      this.getTopRatedShows();
    }
  }

  toggleSearch() {
    this.toggled = this.toggled ? false : true;
  }

  cancelSearch(){
    this.toggled = false;
    this.searchResult = null;
  }

  getPopularTvShows(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box loading"></div>
      </div>`
    });

    loading.present();

    this._tvShowService.getPopularTvShows().subscribe(res => {
      this.popularTvShowList = res.results;
    
    });
    this._tvShowService.getPopularTvShows2().subscribe(res => {
      this.popularTvShowList2 = res.results;
  
    });
    this._tvShowService.getPopularTvShows3().subscribe(res => {
      this.popularTvShowList3 = res.results;
  
    });
    this._tvShowService.getPopularTvShows4().subscribe(res => {
      this.popularTvShowList4 = res.results;
      loading.dismiss();
    });
  }

  getTopRatedShows(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box loading"></div>
      </div>`
    });

    loading.present();

    this._tvShowService.getTopRatedShows().subscribe(res => {
      this.TopRatedShowsList = res.results;
    });
    this._tvShowService.getTopRatedShows2().subscribe(res => {
      this.TopRatedShowsList2 = res.results;
    });
    this._tvShowService.getTopRatedShows3().subscribe(res => {
      this.TopRatedShowsList3 = res.results;
    });
    this._tvShowService.getTopRatedShows4().subscribe(res => {
      this.TopRatedShowsList4 = res.results;
      loading.dismiss();
    });
  }

  goToMoreInfo(id) {
      this.navCtrl.push(TvShowMorePage, {id});
  }

  searchTvShows(event, searchKey) {
    if(event.target.value.length > 2) {
      this._tvShowService.searchTvShows(event.target.value).subscribe(
        data => {
          this.searchResult = data.results;
          console.log(data);
        },
        err => {
          console.log(err);
        },
        () => console.log('Tv-Show Search Complete')
      );
    }
    if (event.target.value.length == 1){
      this.searchResult = null;
    }
  }


}

