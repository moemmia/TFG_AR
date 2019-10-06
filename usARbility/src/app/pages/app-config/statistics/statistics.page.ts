import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController, AlertController, IonContent   } from '@ionic/angular';
import {AppFacade, App, QuestionDetail} from '../../../tools/appfacade';
import { ArrayKit } from '../../../tools/arraykit';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import * as $ from 'jquery';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  @ViewChild(IonContent ) content: IonContent ;


  @Input() criteriai: string;
  @Input() appi: App;


  lang:string;
  app: App;
  criteria: string
  results: Array<QuestionDetail> = [];

  private alive = true;

  constructor(private translate: TranslateService, private uniqueDeviceID: UniqueDeviceID, private fireAuth: AngularFireAuth, public modalController: ModalController, private alertController: AlertController ,private arraykit: ArrayKit, private navParams: NavParams, private appfacade:AppFacade, private router: Router) {
    this.criteria = this.navParams.get('criteriai');
    this.lang = this.translate.currentLang? this.translate.currentLang: this.translate.defaultLang;
    this.app = this.navParams.get('appi');
    this.start();
  }

  dismiss() {
    this.alive = false;
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
  }


  start(){
    this.appfacade.getAppById(this.app.id).snapshotChanges().pipe(takeWhile(() => this.alive)).subscribe(
        app => {
          let data:any = app.payload.data();
          let values = this.arraykit.objectToArray(data.evaluation);

          let totalVal = [];
          let num;
          values.forEach(
            val =>{
                let crt = val[this.criteria]
                Object.keys( crt ).forEach(function(key,index){
                  totalVal[key] = totalVal[key]? totalVal[key] + crt[key]: crt[key];
                });
                num++;
            }
          )

          this.loadData(totalVal,num);
        }
    );
  }

  loadData(values){
        this.appfacade.getEvaluation().snapshotChanges().pipe(takeWhile(() => this.alive)).subscribe(
          x => {
              this.results = [];
              let questions = this.arraykit.objectToArray(x[this.criteria]);
              let num = 0;

              x.forEach( ev => {
                let qs: Array<QuestionDetail> = [];
                let data:any = ev.payload.doc.data();
                let questions = this.arraykit.objectToArray(data);
                let num = 0;
                if(ev.payload.doc.id == this.criteria)
                questions.forEach(
                  q => {
                    this.results.push(new QuestionDetail( ( this.lang == 'es'? q["text_es"]: q["text"] ), values[num]/num));
                    num++;
                  }
                );
              });
          }
        );
  }


}
