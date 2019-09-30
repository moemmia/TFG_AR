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

  app: App;
  activeCriteria = [];
  current: EvaluationPart;
  currentNum: number = -1;
  evaluations = [];
  hasPrev:boolean;
  hasNext:boolean;

  private alive = true;

  constructor(private uniqueDeviceID: UniqueDeviceID, private fireAuth: AngularFireAuth, public modalController: ModalController, private alertController: AlertController ,private arraykit: ArrayKit, private navParams: NavParams, private appfacade:AppFacade, private router: Router) {
    this.start();
  }

  ngOnInit() {
  }

  dismiss() {
    this.alive = false;
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  start(){
    this.app = this.navParams.get('appname');
    if(this.navParams.get('perception') == "true") this.activeCriteria.push('perception');
    if(this.navParams.get('ergonomics') == "true") this.activeCriteria.push('ergonomics');
    if(this.navParams.get('presence') == "true") this.activeCriteria.push('presence');
    if(this.navParams.get('availability') == "true") this.activeCriteria.push('availability');
    if(this.navParams.get('easy') == "true") this.activeCriteria.push('easy');

    this.hasPrev = false;
    this.hasNext = this.activeCriteria.length > 1;
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
              qs.push(new Question( q["text"], q["weight"],num));
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
    const alert = await this.alertController.create({
      header: 'Send Your Evaluation',
      inputs: [
        {
          name: 'comment',
          type: 'text',
          placeholder: 'Write a comment...'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Send',
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
      this.uniqueDeviceID.get().then(
        uuid => {
          this.appfacade.addEvaluation(this.app.id, results, uuid ,'anonymous');
          this.router.navigateByUrl("/home");
          this.dismiss();
        }
      )
    }

  }

  getResult(from){
    if(this.activeCriteria.indexOf(from) > -1){
      let total=0;
      this.evaluations[from].forEach(
        q => {
          total += q.weight * (q.response/100);
        });
      return total;
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
  num: number;
  weight: number;
  response: number;


  public constructor(text,weight,num){
    this.text= text;
    this.weight= weight;
    this.num = num;
    this.response=50;
  }
}
