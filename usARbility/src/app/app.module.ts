import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { IonicStorageModule } from '@ionic/storage';
import { DarkThemer } from './tools/darkthemer';
import { AppFacade } from './tools/appfacade';
import { LoaderController } from './tools/loadercontroller';
import { ArrayKit } from './tools/arraykit';
import { Clipboard } from '@ionic-native/clipboard/ngx';

const firebaseConfig = {
    apiKey: "AIzaSyAq8hqdgiy5IZbpJ9BhLhlQUYt9VW0kqRU",
    authDomain: "usarbility.firebaseapp.com",
    databaseURL: "https://usarbility.firebaseio.com",
    projectId: "usarbility",
    storageBucket: "",
    messagingSenderId: "254079320190",
    appId: "1:254079320190:web:f29e90250f13460c"
  };


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ], providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireAuth,
    DarkThemer,
    AppFacade,
    LoaderController,
    ArrayKit,
    Clipboard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
