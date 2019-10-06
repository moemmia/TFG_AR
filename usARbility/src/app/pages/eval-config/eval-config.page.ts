import { Component, OnInit, OnDestroy , ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppFacade, App, Comment, CriteriaDetail} from '../../tools/appfacade';
import { MenuController, AlertController, ToastController, ModalController  } from '@ionic/angular';
import {DarkThemer} from '../../tools/darkthemer';
import { ArrayKit } from '../../tools/arraykit';
import {LoaderController} from '../../tools/loadercontroller';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';
import { Chart } from 'chart.js';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { takeWhile } from 'rxjs/operators';

import {TranslateService} from '@ngx-translate/core';

import { StatisticsPage } from './statistics/statistics.page';

@Component({
  selector: 'app-eval-config',
  templateUrl: './eval-config.page.html',
  styleUrls: ['./eval-config.page.scss'],
})
export class EvalConfigPage implements OnInit, OnDestroy  {

  currentUserId:string;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  id: any;
  app: App;
  criteria: Array<string> = [];
  criteriaValues: Array<number> = [];
  criteriaDetails: Array<CriteriaDetail> = [];
  comment: Comment;
  date: Date;


  private alive = true;

  constructor(private translate: TranslateService, private modalController: ModalController, private loaderController: LoaderController,private arraykit: ArrayKit,private clipboard: Clipboard, private router: Router, private toastController: ToastController, private route: ActivatedRoute, private appfacade:AppFacade, private darkthemer:DarkThemer, private menu: MenuController, private alertController: AlertController, private fireAuth: AngularFireAuth) {
    this.loaderController.show();

    Chart.Legend.prototype.afterFit = function() {
        this.height = this.height + 25;
    };

    let user=this.fireAuth.auth.currentUser;
    if(user!=null){
      this.currentUserId = this.fireAuth.auth.currentUser.uid;
      this.loadAll();
    }else{
      this.fireAuth.auth.onAuthStateChanged((user) => {
       if (user) {
         this.currentUserId = user.uid;
         this.loadAll();
       }
      });
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadAll(){
    this.route.params.pipe(takeWhile(() => this.alive)).subscribe(
      (params) => {
        this.id = params['id'];
        if(this.id){
          this.loadInfo();
        }else{
          this.loaderController.hide();
          if(this.fireAuth.auth.currentUser) this.router.navigateByUrl("/main");
          else  this.router.navigateByUrl("/home");
        }
      },
    );
  }


  show(id){
      $("#"+id+"-text").attr("hide",$("#"+id+"-text").attr("hide")=="true"?false:true);
      $("#"+id+"-arrow").attr("name",$("#"+id+"-text").attr("hide")=="true"?"arrow-dropdown":"arrow-dropup");
  }

  loadInfo(){
    this.appfacade.getAppById(this.id).snapshotChanges().pipe(takeWhile(() => this.alive)).subscribe(
      app => {
          let data:any = app.payload.data();
          this.app = new App(app.payload.id, data.name, data.creator);
          this.criteria = [];
          this.criteriaValues = [];
          this.criteriaDetails = [];
          let criteria = this.arraykit.objectToArray(data.criteria);
          let evaluations = this.arraykit.objectToArray(data.evaluation);

          evaluations.forEach(
              ev => {
                if(ev['name'] == this.fireAuth.auth.currentUser.email){
                  criteria.forEach(
                  cr => {
                    if(ev[cr.name][0]){
                      this.translate.get('APP_CONFIG.'+cr.name).subscribe(t => {
                        this.criteria.push(t);
                      });
                      this.criteriaDetails.push(new CriteriaDetail(cr.name,ev[cr.name][0]));
                      this.criteriaValues.push(ev[cr.name][0]);
                    }
                  });
                  this.date = new Date(ev['date'].seconds* 1000);
                  if(ev['comment'] != ""){
                    this.comment = new Comment(ev['name'],ev['comment'],this.date);
                  }else{
                    this.comment = null;
                  }

                }
          });
          this.chartLoader();
      });
  }


  ngOnInit() {

  }

  openMenu() {
    this.menu.open('end');
  }

  marksData:any;

  chartLoader() {
    this.marksData = {
      labels: this.criteria,
      datasets: [{
        label: this.app.name,
        radius: 0,
        backgroundColor: "#3880ff",
        data: this.criteriaValues
      }]
    };
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'horizontalBar',
      data: this.marksData,
      options: {
        layout: {
            padding: {
                left: 10,
                right: 50,
                top: 0,
                bottom: 0
            }
        },
        tooltips: {
           enabled: false
        },
        borderSkipped: false,
        legend: {
          display: false,
            labels: {
                fontStyle: "bold"
            }
        },
        scales: {
            xAxes: [{
              ticks: {
                fontColor: this.darkthemer.isDarkScheme()? 'rgb(194, 194, 194)':'rgb(62, 62, 62)',
                fontStyle: "bold",
                beginAtZero: true,
                max: 100
              },
              gridLines: {
                  color: this.darkthemer.isDarkScheme()? 'rgba(0, 0, 0, 0.3)':'rgba(0, 0, 0, 0.15)',
              }
            }],
            yAxes: [{
                barPercentage: 0.5,
                barThickness: 16,
                minBarLength: 2,
                ticks: {
                  fontColor: this.darkthemer.isDarkScheme()? 'rgb(194, 194, 194)':'rgb(62, 62, 62)',
                  fontStyle: "bold"
                },
                gridLines: {
                    offsetGridLines: false,
                    color: "rgba(0, 0, 0, 0)"
                }
            }]
        },
        aspectRatio: "1.5",
        pointLabelFontSize : 20
      }
    });

    this.loaderController.hide();
  }

  redoEval(){
    this.alive = false;
    this.router.navigate(["/eval-app", {id:this.id}]);
  }

  async commentChange(){

    let a: any = {};

    this.translate.get('EVAL_CONFIG.comment_name_header').subscribe(t => {
      a.comment_name_header = t;
    });

    this.translate.get('EVAL_CONFIG.comment_placeholder').subscribe(t => {
      a.comment_placeholder = t;
    });


    this.translate.get('ALERT.cancel').subscribe(t => {
      a.cancel = t;
    });

    this.translate.get('ALERT.confirm').subscribe(t => {
      a.confirm = t;
    });

    let comment = this.comment? this.comment.comment:"";
    const alert = await this.alertController.create({
      header: a.comment_name_header,
      inputs: [
        {
          name: 'comment',
          type: 'text',
          value: comment,
          placeholder: a.comment_placeholder
        }],
      buttons: [
        {
          text:  a.cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: a.confirm,
          handler: (ref) => {
            this.appfacade.changeEvalComment(this.app.id,this.currentUserId,ref.comment);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteEval(){

    let a: any = {};

    this.translate.get('EVAL_CONFIG.delete_eval_header').subscribe(t => {
      a.delete_eval_header = t;
    });

    this.translate.get('EVAL_CONFIG.delete_eval_text').subscribe(t => {
      a.delete_eval_text = t;
    });

    this.translate.get('ALERT.cancel').subscribe(t => {
      a.cancel = t;
    });

    this.translate.get('ALERT.confirm').subscribe(t => {
      a.confirm = t;
    });

    const alert = await this.alertController.create({
      header: a.delete_eval_header,
      message: a.delete_eval_text+ this.app.name +'?',
      buttons: [
        {
          text: a.cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: a.confirm,
          handler: (ref) => {
            this.appfacade.removeEvaluation(this.app.id,this.currentUserId);
            this.router.navigateByUrl("/my-evaluations");
          }
        }
      ]
    });
    await alert.present();
  }


  async openStatistics(criteria){

      this.alive = false;
      const modal = await this.modalController.create({
        component: StatisticsPage,
        componentProps: {
          'criteriai': criteria,
          'appi': this.app,
          'evaluatorId' : this.currentUserId
        }
      });
      return await modal.present();
  }

}
