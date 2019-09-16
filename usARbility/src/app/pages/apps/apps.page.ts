import { Component, OnInit } from '@angular/core';
import {AppFacade, App} from '../../tools/appfacade';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';
import {LoaderController} from '../../tools/loadercontroller';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.page.html',
  styleUrls: ['./apps.page.scss'],
})
export class AppsPage implements OnInit {

  userApps: Array<App> = [];
  currentUserId:string;
  constructor(private loaderController: LoaderController, private appfacade:AppFacade, public alertController: AlertController, private router: Router, private fireAuth: AngularFireAuth) { }

  loadData(){
    this.appfacade.getAppsCreatedByCurrentUser(this.currentUserId).snapshotChanges().subscribe(
      x => {
        this.userApps = [];
        x.forEach( app => {
          let data:any = app.payload.doc.data();
          let obj = new App( app.payload.doc.id, data.name, data.creator);
          this.userApps.push(obj);
        });
      }
    );
  }

  ngOnInit() {
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
