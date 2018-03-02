import { Injectable } from "@angular/core";
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

  // firebase login o logout / create user metoder

  createUserWithEmailAndPassword(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }


  signInWithEmailAndPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(authState => {

      // Creates or Updates /users/uid
      firebase.database().ref('/').child('/users/' + authState.uid).update({
        uid: authState.uid,
        email: authState.email
      })
    });
  }


  signInWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithPopup(provider).then(result => {

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      let accessToken = result.credential.accessToken;

      // The signed-in user info.
      let user = result.user;

      // Creates or Updates /users/uid
      firebase.database().ref('/').child('/users/' + user.uid).update({
        accessToken: accessToken,
        uid: user.uid,
        email: user.email,
      });
    });
  }


  signOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }, (error) => {
      console.log(error.message);
    });
  }


  currentUser() {
    return firebase.auth().currentUser;
  }
}
