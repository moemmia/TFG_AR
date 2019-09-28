import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AppFacade} from '../../../tools/appfacade';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.page.html',
  styleUrls: ['./evaluate.page.scss'],
})
export class EvaluatePage implements OnInit {

  constructor(private appfacade:AppFacade, private fireAuth: AngularFireAuth, public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async showError(error){
     const alert = await this.alertController.create({
      header: 'Error',
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }

  evaluate(){
    let id= $("#code").val();
    if(!id){
      this.showError("you must input the code for the app");
    }else{
      let context = this;
      this.appfacade.getAppById(id).ref.get().then(function(doc) {
          if (doc.exists) {
              context.router.navigate(["/eval-selection", {id:id}]);
          } else {
              context.showError("there is no app for this code");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }
  }

}
