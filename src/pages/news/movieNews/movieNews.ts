import {Component, OnInit} from '@angular/core';
import {NodeJsService} from "../../../services/nodejs.service";
import {LoadingController} from "ionic-angular";
import { InAppBrowser } from '@ionic-native/in-app-browser';
@Component({

  selector: 'page-movieNews',
  templateUrl: 'movieNews.html',

})

export class MovieNewsPage implements OnInit {

  newsImagess : any;
  newsTitless : any;
  newsDatess : any;
  newsUrlss : any;
  newsArray = [];

  constructor(private nodeService: NodeJsService, public loadingCtrl: LoadingController, private iab: InAppBrowser) {

  }


ngOnInit(){

    this.getNews();

}

createInAppBrowser(link:string){
  this.iab.create(`${link}`);
}

//hämtar alla värdena från nodeservicen och sedan lägger jag dem i en array för att sedan kunna loopa igenom alla
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



}
