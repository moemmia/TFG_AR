import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AppFacade} from '../../../tools/appfacade';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.page.html',
  styleUrls: ['./evaluate.page.scss'],
})
export class EvaluatePage implements OnInit {

  constructor(private translate: TranslateService,private appfacade:AppFacade, private fireAuth: AngularFireAuth, public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async showError(error){

    let a: any = {};

    this.translate.get('ALERT.ok').subscribe(t => {
      a.ok = t;
    });

    this.translate.get('ALERT.error').subscribe(t => {
      a.error = t;
    });

     const alert = await this.alertController.create({
      header: a.error,
      message: error,
      buttons: [a.ok]
    });

    await alert.present();
  }

  evaluate(){

    let a: any = {};

    this.translate.get('HOME.EVALUATE.error_no_code').subscribe(t => {
      a.error_no_code = t;
    });

    this.translate.get('HOME.EVALUATE.error_no_app').subscribe(t => {
      a.error_no_app = t;
    });

    this.translate.get('HOME.EVALUATE.error_get_doc').subscribe(t => {
      a.error_get_doc = t;
    });

    let id= $("#code").val();
    if(!id){
      this.showError(a.error_no_code);
    }else{
      let context = this;
      this.appfacade.getAppById(id).ref.get().then(function(doc) {
          if (doc.exists) {
              context.router.navigate(["/eval-selection", {id:id}]);
          } else {
              context.showError(a.error_no_app);
          }
      }).catch(function(error) {
          console.log(a.error_get_doc, error);
      });
    }
  }

}
