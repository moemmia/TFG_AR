import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AppFacade, CriteriaDetail, App} from '../../tools/appfacade';
import {LoaderController} from '../../tools/loadercontroller';
import { ArrayKit } from '../../tools/arraykit';
import { AngularFireAuth } from 'angularfire2/auth';
import { ModalController, AlertController } from '@ionic/angular';
import { AEvaluationPage } from './evaluation/evaluation.page';

import * as $ from 'jquery';
import { takeWhile } from 'rxjs/operators';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-eval-selection',
  templateUrl: './eval-selection.page.html',
  styleUrls: ['./eval-selection.page.scss'],
})
export class EvalSelectionPage implements OnInit, OnDestroy {

  list =[ {name:'perception'},{name:'ergonomics'},{name:'presence'},{name:'availability'},{name:'easy'} ];

  id: any;
  currentUserId:string;
  app: App;

  private alive = true;

  constructor(private translate: TranslateService, private modalController: ModalController, private loaderController: LoaderController, private router: Router,private arraykit: ArrayKit,private appfacade:AppFacade, private fireAuth: AngularFireAuth, private route: ActivatedRoute, private alertController: AlertController) {
    this.loaderController.show();
    let user=this.fireAuth.auth.currentUser;
    if(user!=null){
      this.currentUserId = this.fireAuth.auth.currentUser.uid;
    }else{
      this.fireAuth.auth.onAuthStateChanged((user) => {
       if (user) {
         this.currentUserId = user.uid;
       }
      });
    }

    route.params.pipe(takeWhile(() => this.alive)).subscribe(
      (params) => {
        this.id = params['id'];
        if(this.id){
          this.checkCriteria();
        }else{
          this.loaderController.hide();
          if(this.fireAuth.auth.currentUser) this.router.navigateByUrl("/main");
          else  this.router.navigateByUrl("/home");
        }
      },
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }


  checkCriteria(){
    this.appfacade.getAppById(this.id).snapshotChanges().pipe(takeWhile(() => this.alive)).subscribe(
      x => {
        let data:any =  x.payload.data();
        this.app = new App(x.payload.id, data.name, data.creator);
        let criteria = this.arraykit.objectToArray(data.criteria);
        criteria.forEach(
        cr => {
          this.changeList(cr.name,cr.active);
        });
        this.loaderController.hide();
      }
    );
  }

  changeList(criteria,active){
    $("#"+criteria+"-check").attr('checked',active);
    $("#"+criteria+"-check").attr('disabled',!active);
    if(!active){
      $("#"+criteria+"-name").attr('color','medium');
    }
  }

  show(id){
      $("#"+id+"-text").attr("hide",$("#"+id+"-text").attr("hide")=="true"?false:true);
      $("#"+id+"-arrow").attr("name",$("#"+id+"-text").attr("hide")=="true"?"arrow-dropdown":"arrow-dropup");
  }

  ngOnInit(){

  }

  async startEvaluation(){
    if( !( ($("#perception-check").attr('aria-checked')== 'true') || ($("#ergonomics-check").attr('aria-checked')== 'true') || ($("#presence-check").attr('aria-checked')== 'true') || ($("#availability-check").attr('aria-checked')== 'true') || ($("#easy-check").attr('aria-checked')== 'true'))){

      let err;
      this.translate.get('EVAL_SELECTION.error_no_select').subscribe(t => {
        err = t;
      });
      this.showError(err);
    }else{
      this.alive = false;
      const modal = await this.modalController.create({
        component: AEvaluationPage,
        componentProps: {
          'perception': $("#perception-check").attr('aria-checked'),
          'ergonomics': $("#ergonomics-check").attr('aria-checked'),
          'presence': $("#presence-check").attr('aria-checked'),
          'availability': $("#availability-check").attr('aria-checked'),
          'easy': $("#easy-check").attr('aria-checked'),
          'appname': this.app,
          'evaluatorId' : this.currentUserId
        }
      });
      return await modal.present();
    }

  }


    async showError(error,header=''){

        let a: any = {};

        this.translate.get('ALERT.ok').subscribe(t => {
          a.ok = t;
        });

        if(header == ""){
          this.translate.get('ALERT.error').subscribe(t => {
            header = t;
          });
        }

       const alert = await this.alertController.create({
        header: header,
        message: error,
        buttons: [a.ok]
      });

      await alert.present();
    }
}
