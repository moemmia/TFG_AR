import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController, AlertController, IonContent   } from '@ionic/angular';
import {AppFacade, App} from '../../../tools/appfacade';
import { ArrayKit } from '../../../tools/arraykit';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import * as $ from 'jquery';

import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.page.html',
  styleUrls: ['./evaluation.page.scss'],
})
export class EvaluationPage implements OnInit {

  @ViewChild(IonContent ) content: IonContent ;

  @Input() perception: boolean;
  @Input() ergonomics: boolean;
  @Input() presence: boolean;
  @Input() availability: boolean;
  @Input() easy: boolean;
  @Input() appname: App;
  @Input() evaluatorId: string;


  lang:string;
  app: App;
  activeCriteria = [];
  current: EvaluationPart;
  currentNum: number = -1;
  evaluations = [];
  hasPrev:boolean;
  hasNext:boolean;

  private alive = true;
  private uuid:string;

  constructor(private translate: TranslateService, private uniqueDeviceID: UniqueDeviceID, private fireAuth: AngularFireAuth, public modalController: ModalController, private alertController: AlertController ,private arraykit: ArrayKit, private navParams: NavParams, private appfacade:AppFacade, private router: Router) {

    if(this.navParams.get('evaluatorId')){
      this.start(this.navParams.get('evaluatorId'));
    }else{
      this.uniqueDeviceID.get().then(
        uuid => {
          this.uuid = uuid;
          this.start(uuid);
        }
      ).catch((error: any) => {
        let err;
        this.translate.get('EVAL_SELECTION.error_no_id').subscribe(t => {
          err = t;
        });
        this.showError(err, () => {
          this.dismiss();
          this.router.navigateByUrl("/home");
        });
      });
    }



  }

  ngOnInit() {
  }

  dismiss() {
    this.alive = false;
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  start(id){
    this.lang = this.translate.currentLang? this.translate.currentLang: this.translate.defaultLang;

    this.app = this.navParams.get('appname');
    if(this.navParams.get('perception') == "true") this.activeCriteria.push('perception');
    if(this.navParams.get('ergonomics') == "true") this.activeCriteria.push('ergonomics');
    if(this.navParams.get('presence') == "true") this.activeCriteria.push('presence');
    if(this.navParams.get('availability') == "true") this.activeCriteria.push('availability');
    if(this.navParams.get('easy') == "true") this.activeCriteria.push('easy');

    this.hasPrev = false;
    this.hasNext = this.activeCriteria.length > 1;

    this.appfacade.getAppById(this.app.id).snapshotChanges().pipe(takeWhile(() => this.alive)).subscribe(
        app => {
          let data:any = app.payload.data();
          let values =  data.evaluation[id]
          if(values){
            this.loadDataRewrite(values);

          }else{
            this.loadDataNoRewrite();
          }
        }
    );
  }

  loadDataRewrite(values){
        this.appfacade.getEvaluation().snapshotChanges().pipe(takeWhile(() => this.alive)).subscribe(
          x => {
            this.evaluations = [];
            x.forEach( ev => {
              let qs: Array<Question> = [];
              let data:any = ev.payload.doc.data();
              let questions = this.arraykit.objectToArray(data);
              let num = 0;
              questions.forEach(
                q => {
                  qs.push(new Question( q["text"], q["text_es"], q["weight"],num,values[ev.payload.doc.id][num]));
                  num++;
                }
              );
              this.evaluations[ev.payload.doc.id]= qs;
            });
            this.next();
          }
        );
  }


  loadDataNoRewrite(){
        this.appfacade.getEvaluation().snapshotChanges().pipe(takeWhile(() => this.alive)).subscribe(
          x => {
            this.evaluations = [];
            x.forEach( ev => {
              let qs: Array<Question> = [];
              let data:any = ev.payload.doc.data();
              let questions = this.arraykit.objectToArray(data);
              let num = 0;
              questions.forEach(
                q => {
                  qs.push(new Question( q["text"], q["text_es"], q["weight"],num));
                  num++;
                }
              );
              this.evaluations[ev.payload.doc.id]= qs;
            });
            this.next();
          }
        );
  }

  next(){
    this.currentNum++;
    this.current = new EvaluationPart(this.activeCriteria[this.currentNum],this.evaluations[this.activeCriteria[this.currentNum]]);

    this.hasNext = this.currentNum < this.activeCriteria.length - 1;
    this.hasPrev = this.currentNum > 0;
    this.content.scrollToTop();
  }

  prev(){
    this.currentNum--;
    this.current = new EvaluationPart(this.activeCriteria[this.currentNum],this.evaluations[this.activeCriteria[this.currentNum]]);

    this.hasNext = true;
    this.hasPrev = this.currentNum > 0;
  }

  async send(){

    let a: any = {};

    this.translate.get('EVAL_SELECTION.send_evaluation').subscribe(t => {
      a.send_evaluation = t;
    });

    this.translate.get('EVAL_SELECTION.comment_placeholder').subscribe(t => {
      a.comment_placeholder = t;
    });

    this.translate.get('ALERT.cancel').subscribe(t => {
      a.cancel = t;
    });

    this.translate.get('ALERT.send').subscribe(t => {
      a.send = t;
    });

    const alert = await this.alertController.create({
      header: a.send_evaluation,
      inputs: [
        {
          name: 'comment',
          type: 'text',
          placeholder: a.comment_placeholder
        }],
      buttons: [
        {
          text: a.cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: a.send ,
          handler: (ref) => {
            this.saveData(ref.comment);
          }
        }
      ]
    });
    await alert.present();
  }

  async saveData(comment){
    let results = {
        perception: this.getResult("perception"),
        ergonomics: this.getResult("ergonomics"),
        presence: this.getResult("presence"),
        availability: this.getResult("availability"),
        easy: this.getResult("easy"),
        comment: comment
    };
    if(this.fireAuth.auth.currentUser){
      this.appfacade.addEvaluation(this.app.id, results, this.fireAuth.auth.currentUser.uid, this.fireAuth.auth.currentUser.email);
      this.router.navigateByUrl("/main");
      this.dismiss();
    }else{
      this.appfacade.addEvaluation(this.app.id, results, this.uuid ,'anonymous');
      this.router.navigateByUrl("/home");
      this.dismiss();
    }

  }

  async showError(error,onPress){

      let a: any = {};

      this.translate.get('ALERT.ok').subscribe(t => {
        a.ok = t;
      });

     const alert = await this.alertController.create({
      header: '',
      message: error,
      buttons: [{
        text: a.ok,
        handler: () => {
          onPress();
        }
      }]
    });

    await alert.present();
  }

  getResult(from){
    if(this.activeCriteria.indexOf(from) > -1){
      let result = [];
      let total=0;
      this.evaluations[from].forEach(
        q => {
          total += q.weight * (q.response/100);
      });
      result.push(total);
      this.evaluations[from].forEach(
          q => {
            result.push(q.response);
      });
      return result;
    }else{
      return -1;
    }

  }



}

export class EvaluationPart
{
  name: string;
  questions: Array<Question>;


  public constructor(name,questions){
    this.questions= questions;
    this.name= name;
  }
}

export class Question
{
  text: string;
  text_es: string;
  num: number;
  weight: number;
  response: number;


  public constructor(text,textes,weight,num,response=50){
    this.text= text;
    this.text_es= textes;
    this.weight= weight;
    this.num = num;
    this.response=response;
  }
}


export class AEvaluationPage extends EvaluationPage {}
