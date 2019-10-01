import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AppFacade, CriteriaDetail, App} from '../../tools/appfacade';
import {LoaderController} from '../../tools/loadercontroller';
import { ArrayKit } from '../../tools/arraykit';
import { AngularFireAuth } from 'angularfire2/auth';
import { ModalController, AlertController } from '@ionic/angular';
import { EvaluationPage } from './evaluation/evaluation.page';

import * as $ from 'jquery';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-eval-selection',
  templateUrl: './eval-selection.page.html',
  styleUrls: ['./eval-selection.page.scss'],
})
export class EvalSelectionPage implements OnInit, OnDestroy {

  lorem = "Lorem ipsum dolor sit amet consectetur adipiscing elit class metus aliquet, platea ullamcorper nibh aptent placerat varius sociis lobortis. Euismod volutpat sollicitudin ultricies donec nec eu tincidunt proin senectus, cum conubia fusce himenaeos faucibus mattis risus iaculis, ut litora netus suscipit ac sagittis potenti vulputate.";

  list = [
    {
      title: 'perception',
      name: 'perception',
      text: this.lorem
    },
    {
      title: 'ergonomics',
      name: 'ergonomics',
      text: this.lorem
    },
    {
      title: 'presence',
      name: 'presence',
      text: this.lorem
    },
    {
      title: 'availability',
      name: 'availability',
      text: this.lorem
    },
    {
      title: 'easy to use',
      name: 'easy',
      text: this.lorem
    }];

  id: any;
  currentUserId:string;
  app: App;

  private alive = true;

  constructor(private modalController: ModalController, private loaderController: LoaderController, private router: Router,private arraykit: ArrayKit,private appfacade:AppFacade, private fireAuth: AngularFireAuth, private route: ActivatedRoute, private alertController: AlertController) {
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
      this.showError("You must select at least one criteria");
    }else{
      this.alive = false;
      const modal = await this.modalController.create({
        component: EvaluationPage,
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

  async showError(error,header='Error'){
     const alert = await this.alertController.create({
      header: header,
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }
}
