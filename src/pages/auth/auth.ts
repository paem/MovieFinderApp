import {Component} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {LoadingController, AlertController} from "ionic-angular";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})

export class AuthPage {
  // default value for the segment pick
  selectedAuthType = 'signin';

  constructor(private firebaseService: FirebaseService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }


  signInWithFacebook() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">Signing in...</div>
      </div>`
    });

    loading.present();

    this.firebaseService.signInWithFacebook().then(authState => {
      loading.dismiss();
    }).catch(error => {
      loading.dismiss();
      this.alertMessage(error.message);
    });
  }


  private loading(message: string) {
    return this.loadingCtrl.create({
      content: message
    });
  }


  private alertMessage(message: string) {
    const alert = this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }


  onSigninWithEmail(form: NgForm) {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">Signing in...</div>
      </div>`
    });

    loading.present();

    this.firebaseService.signInWithEmailAndPassword(form.value.email, form.value.password).then(authState => {
      loading.dismiss();
    }).catch(error => {
      loading.dismiss();
      this.alertMessage(error.message);
    });
  }

  onSignUpWithEmail(form: NgForm) {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">Setting up your account...</div>
      </div>`
    });

    loading.present();

    this.firebaseService.createUserWithEmailAndPassword(form.value.email, form.value.password).then(authState => {
      loading.dismiss();
    }).catch(error => {
      loading.dismiss();
      this.alertMessage(error.message);
    });
  }

}
