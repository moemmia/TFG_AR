import { Component, OnInit, OnDestroy } from '@angular/core';
import { PickerController, AlertController } from '@ionic/angular';
import { PickerOptions, PickerButton } from '@ionic/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {AppFacade, App} from '../../tools/appfacade';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';
import { takeWhile } from 'rxjs/operators';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-eval-app',
  templateUrl: './eval-app.page.html',
  styleUrls: ['./eval-app.page.scss'],
})
export class EvalAppPage implements OnInit, OnDestroy {

  id: any;
  userApps: Array<Object>;
  currentUserId:string;

  private alive = true;
  private isLoaded:boolean = false;

  constructor(private translate: TranslateService, private route: ActivatedRoute, private pickerCtrl: PickerController, private router: Router,private appfacade:AppFacade, private fireAuth: AngularFireAuth, public alertController: AlertController) {
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

    route.params.pipe(takeWhile(() => this.alive)).subscribe(
      (params) => {
        this.id = params['id'];
      },
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadData(){
    this.appfacade.getAppsCreatedByCurrentUser(this.currentUserId).snapshotChanges().pipe(takeWhile(() => this.alive)).subscribe(
      x => {
        this.userApps = [];
        x.forEach( app => {
          let data:any = app.payload.doc.data();
          let obj = {
            value: app.payload.doc.id,
            text: data.name
          }
          this.userApps.push(obj);
        });
        this.isLoaded=true;
      }
    );
  }


  ngOnInit() {
  }

  next(){

    let a: any = {};

    this.translate.get('MY_EVAL.error_no_code').subscribe(t => {
      a.error_no_code = t;
    });

    this.translate.get('MY_EVAL.error_get_doc').subscribe(t => {
      a.error_get_doc = t;
    });

    this.translate.get('MY_EVAL.error_no_app').subscribe(t => {
      a.error_no_app = t;
    });

    let id= $("#appId").val();
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

  async search(){

    let a: any = {};

    this.translate.get('ALERT.cancel').subscribe(t => {
      a.cancel = t;
    });

    this.translate.get('ALERT.select').subscribe(t => {
      a.select = t;
    });


    let opts: PickerOptions = {
      buttons: [
        {
          text: a.cancel,
          role: 'cancel'
        },
        {
          text: a.select,
          handler: (selected) => {
                $("#appId").val(selected.apps.value);
          }
        }
      ],
      columns: [
        {
          name: 'apps',
          options: this.userApps
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
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


}
