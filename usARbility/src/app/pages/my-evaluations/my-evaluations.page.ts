import { Component, OnInit } from '@angular/core';
import {AppFacade, App} from '../../tools/appfacade';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';
import {LoaderController} from '../../tools/loadercontroller';

@Component({
  selector: 'app-my-evaluations',
  templateUrl: './my-evaluations.page.html',
  styleUrls: ['./my-evaluations.page.scss'],
})
export class MyEvaluationsPage implements OnInit {

  userEvaluatedApps: Array<App> = [];
  currentUserId:string;
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

  loadData(){
    this.appfacade.getAppsEvaluatedByCurrentUser(this.currentUserId).snapshotChanges().subscribe(
      x => {
        this.userEvaluatedApps = [];
        x.forEach( app => {
          let data:any = app.payload.doc.data();
          let obj = new App( app.payload.doc.id, data.name, data.creator);
          this.userEvaluatedApps.push(obj);
        });
      }
    );
  }

  deleteEvaluation(id){
    this.appfacade.removeEvaluation(id,this.currentUserId)
  }


  ngOnInit() {
  }

}
