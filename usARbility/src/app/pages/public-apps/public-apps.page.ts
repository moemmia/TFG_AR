import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppFacade, App} from '../../tools/appfacade';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';
import {LoaderController} from '../../tools/loadercontroller';
import { takeWhile } from 'rxjs/operators';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'public-apps',
  templateUrl: './public-apps.page.html',
  styleUrls: ['./public-apps.page.scss'],
})
export class PublicAppsPage implements OnInit, OnDestroy {

  publicApps: Array<App> = [];
  currentUserId:string;

  private alive = true;
  private isLoaded:boolean = false;

  constructor(private translate: TranslateService,private loaderController: LoaderController, private appfacade:AppFacade, public alertController: AlertController, private router: Router, private fireAuth: AngularFireAuth) {
    let user=this.fireAuth.auth.currentUser;
    if(user!=null){
      this.currentUserId = this.fireAuth.auth.currentUser.uid;
      this.loadData();
    }else{
      this.fireAuth.auth.onAuthStateChanged((user) => {
       if (user) {
         this.currentUserId = user.uid;
         this.loadData();
       }
      });
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadData(){
    this.appfacade.getPublicApps().snapshotChanges().pipe(takeWhile(() => this.alive)).subscribe(
      x => {
        this.publicApps = [];
        x.forEach( app => {
          let data:any = app.payload.doc.data();
          if( data.creator == this.currentUserId ) return;
          let obj = new App( app.payload.doc.id, data.name, data.creator, data.isPublic);
          this.publicApps.push(obj);
        });
        this.isLoaded=true;
      }
    );
  }

  ngOnInit() {
  }

  async openAdd(){

    let a: any = {};

    this.translate.get('MY_APPS.alert_title').subscribe(t => {
      a.title = t;
    });

    this.translate.get('MY_APPS.alert_palceholder').subscribe(t => {
      a.placeholder = t;
    });

    this.translate.get('ALERT.cancel').subscribe(t => {
      a.cancel = t;
    });

    this.translate.get('ALERT.ok').subscribe(t => {
      a.ok = t;
    });

    this.translate.get('MY_APPS.error_header').subscribe(t => {
      a.error_header = t;
    });

    this.translate.get('MY_APPS.error_message').subscribe(t => {
      a.error_message = t;
    });

    const alert = await this.alertController.create({
      header: a.title,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: a.placeholder
        }],
      buttons: [
        {
          text: a.cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: a.ok,
          handler: (ref) => {
            if(ref.name != ""){
              this.appfacade.addApp(ref.name,this.currentUserId);
            }else{
              this.showMessage(a.error_message,a.error_header);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async showMessage(error,header){

    let a: any = {};

    this.translate.get('ALERT.ok').subscribe(t => {
      a.ok = t;
    });

     const alert = await this.alertController.create({
      header: header,
      message: error,
      buttons: [a.ok]
    });

    await alert.present();
  }

  goToAppView(id){
    this.router.navigate(["/app-config", {id:id}]);
  }

}
