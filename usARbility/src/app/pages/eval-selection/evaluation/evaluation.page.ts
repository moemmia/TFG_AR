import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {AppFacade, App} from '../../../tools/appfacade';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.page.html',
  styleUrls: ['./evaluation.page.scss'],
})
export class EvaluationPage implements OnInit {

  @Input() perception: boolean;
  @Input() ergonomics: boolean;
  @Input() presence: boolean;
  @Input() availability: boolean;
  @Input() easy: boolean;
  @Input() appname: App;
  @Input() evaluatorId: string;

  app: App;
  current: EvaluationPart;
  currentNum: number;
  evaluations: Array<EvaluationPart>;
  hasPrev:boolean;
  hasNext:boolean;

  constructor(public modalController: ModalController, private navParams: NavParams, private appfacade:AppFacade) {
    this.start();
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  start(){
    this.app = this.navParams.get('appname');
    this.hasPrev = false;
    this.hasNext = true;

  }

  next(){

  }

  prev(){

  }

  send(){

  }

  calculate(){

  }

  saveData(){

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
  value: number;
  response: number;


  public constructor(text,value){
    this.text= text;
    this.value= value;
  }
}
