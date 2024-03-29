import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppFacade, App} from '../../tools/appfacade';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';
import {LoaderController} from '../../tools/loadercontroller';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-my-evaluations',
  templateUrl: './my-evaluations.page.html',
  styleUrls: ['./my-evaluations.page.scss'],
})
export class MyEvaluationsPage implements OnInit, OnDestroy {

  userEvaluatedApps: Array<App> = [];
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
    this.appfacade.getAppsEvaluatedByCurrentUser(this.currentUserId).snapshotChanges().pipe(takeWhile(() => this.alive)).subscribe(
      x => {
        this.userEvaluatedApps = [];
        x.forEach( app => {
          let data:any = app.payload.doc.data();
          let obj = new App( app.payload.doc.id, data.name, data.creator, data.isPublic);
          this.userEvaluatedApps.push(obj);
        });
        this.isLoaded=true;
      }
    );
  }

  deleteEvaluation(id){
    this.appfacade.removeEvaluation(id,this.currentUserId)
  }


  ngOnInit() {
  }

  goToEvalConfig(id){
    this.router.navigate(["/eval-config", {id:id}]);
  }

}
