import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppFacade, App} from '../../tools/appfacade';
import { AlertController } from '@ionic/angular';
import * as $ from 'jquery';

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.page.html',
  styleUrls: ['./app-config.page.scss'],
})
export class AppConfigPage implements OnInit {



  id: any;
  app: App;

  constructor(private route: ActivatedRoute, private appfacade:AppFacade) {
    route.params.subscribe(
      (params) => {
        this.id = params['id'];
        this.loadInfo();
      },
    );
  }

  loadInfo(){
    this.appfacade.getAppById(this.id).snapshotChanges().subscribe(
      app => {
          let data:any = app.payload.data();
          console.log(data)
          this.app = new App( app.payload.id, data.name, data.creator);
      });
  }

  ngOnInit() { }

}
