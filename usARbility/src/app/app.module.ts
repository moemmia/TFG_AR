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
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService  } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { firebaseEnvConfig } from '../environments/environment';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const firebaseConfig = {
    apiKey: firebaseEnvConfig.apiKey,
    authDomain:  firebaseEnvConfig.authDomain,
    databaseURL:  firebaseEnvConfig.databaseURL,
    projectId:  firebaseEnvConfig.projectId,
    storageBucket:  firebaseEnvConfig.storageBucket,
    messagingSenderId:  firebaseEnvConfig.messagingSenderId,
    appId:  firebaseEnvConfig.appId
  };


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ], providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireAuth,
    DarkThemer,
    AppFacade,
    LoaderController,
    ArrayKit,
    Clipboard,
    UniqueDeviceID,
    SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
