import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppFacade, App} from '../../tools/appfacade';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';
import {LoaderController} from '../../tools/loadercontroller';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.page.html',
  styleUrls: ['./apps.page.scss'],
})
export class AppsPage implements OnInit, OnDestroy {

  userApps: Array<App> = [];
  currentUserId:string;

  private alive = true;
  private isLoaded:boolean = false;

  constructor(private loaderController: LoaderController, private appfacade:AppFacade, public alertController: AlertController, private router: Router, private fireAuth: AngularFireAuth) {
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
    this.appfacade.getAppsCreatedByCurrentUser(this.currentUserId).snapshotChanges().pipe(takeWhile(() => this.alive)).subscribe(
      x => {
        this.userApps = [];
        x.forEach( app => {
          let data:any = app.payload.doc.data();
          let obj = new App( app.payload.doc.id, data.name, data.creator);
          this.userApps.push(obj);
        });
        this.isLoaded=true;
      }
    );
  }

  ngOnInit() {
  }

  async openAdd(){
    const alert = await this.alertController.create({
      header: 'Create a new App',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ok',
          handler: (ref) => {
            this.appfacade.addApp(ref.name,this.currentUserId);
          }
        }
      ]
    });
    await alert.present();
  }

  goToAppConfig(id){
    this.router.navigate(["/app-config", {id:id}]);
  }

}
