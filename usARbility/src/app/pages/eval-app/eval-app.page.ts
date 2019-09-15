import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions, PickerButton } from '@ionic/core';
import { Router } from '@angular/router';
import {AppFacade, App} from '../../tools/appfacade';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';

@Component({
  selector: 'app-eval-app',
  templateUrl: './eval-app.page.html',
  styleUrls: ['./eval-app.page.scss'],
})
export class EvalAppPage implements OnInit {

  userApps: Array<Object> = [];
  currentUserId:string;

  constructor(private pickerCtrl: PickerController, private router: Router,private appfacade:AppFacade, private fireAuth: AngularFireAuth) {
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

  loadData(){
    this.appfacade.getAppsCreatedByCurrentUser(this.currentUserId).snapshotChanges().subscribe(
      x => {
        this.userApps = [];
        x.forEach( app => {
          let data:any = app.payload.doc.data();
          let obj = {
            value: app.payload.doc.id,
            text: data.name
          }
          this.userApps.push(obj);
        });
      }
    );
  }


  ngOnInit() {
  }

  next(){
    //Comprobar que existe la app y enviar info a la siguiente pagina
    this.router.navigateByUrl("/eval-selection");
  }

  async search(){
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Select',
          handler: (selected) => {
                $("#appId").val(selected.apps.value);
          }
        }
      ],
      columns: [
        {
          name: 'apps',
          options: this.userApps
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
  }

}
