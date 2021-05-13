import { Component, OnInit } from '@angular/core';


import  firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'instagram-clone';

  ngOnInit(): void {

    const firebaseConfig = {
      apiKey: "AIzaSyDY9xltqPN6HbmXZg_lHKIkkfcOWw530kM",
      authDomain: "instagram-clone-a0828.firebaseapp.com",
      projectId: "instagram-clone-a0828",
      storageBucket: "instagram-clone-a0828.appspot.com",
      messagingSenderId: "948394183546",
      appId: "1:948394183546:web:8a8f10c3031ddcdf9364c3",
      measurementId: "G-TF4E0EYKW8"
    };

    firebase.initializeApp(firebaseConfig)
  }
}
