import { Component, OnInit } from '@angular/core';
import {AppFacade, App} from '../../tools/appfacade';
import { AlertController } from '@ionic/angular';
import * as $ from 'jquery';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.page.html',
  styleUrls: ['./apps.page.scss'],
})
export class AppsPage implements OnInit {

  userApps: Array<App> = [];

  constructor(private appfacade:AppFacade, public alertController: AlertController) {
    appfacade.getAppsCreatedByCurrentUser().snapshotChanges().subscribe(
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
            this.appfacade.addApp(ref.name);
          }
        }
      ]
    });
    await alert.present();
  }

  show(id){

  }

}
