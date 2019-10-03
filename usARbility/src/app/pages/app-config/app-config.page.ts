import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppFacade, App, Comment, CriteriaDetail} from '../../tools/appfacade';
import { MenuController, AlertController, ToastController  } from '@ionic/angular';
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

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.page.html',
  styleUrls: ['./app-config.page.scss'],
})
export class AppConfigPage implements OnInit, OnDestroy {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  id: any;
  app: App;
  charCriteria: Array<string> = [];
  activeCriteria: Array<string> = [];
  activeCriteriaValues: Array<number> = [];
  activeCriteriaDetails: Array<CriteriaDetail> = [];
  comments: Array<Comment> = [];

  private alive = true;

  constructor(private translate: TranslateService, private loaderController: LoaderController, private fireAuth: AngularFireAuth,private arraykit: ArrayKit,private clipboard: Clipboard, private router: Router, private toastController: ToastController, private route: ActivatedRoute, private appfacade:AppFacade, private darkthemer:DarkThemer, private menu: MenuController, private alertController: AlertController) {
    this.loaderController.show();
    Chart.Legend.prototype.afterFit = function() {
        this.height = this.height + 25;
    };

    let user=this.fireAuth.auth.currentUser;
    if(user!=null){
       this.loadAll();
    }else{
      this.fireAuth.auth.onAuthStateChanged((user) => {
       if (user) {
         this.loadAll();
       }
      });
    }
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

  ngOnDestroy() {
    this.alive = false;
  }

  show(id){
      $("#"+id+"-text").attr("hide",$("#"+id+"-text").attr("hide")=="true"?false:true);
      $("#"+id+"-arrow").attr("name",$("#"+id+"-text").attr("hide")=="true"?"arrow-dropdown":"arrow-dropup");
  }

  loadInfo(){
    this.appfacade.getAppById(this.id).snapshotChanges().pipe(takeWhile(() => this.alive)).subscribe(
      app => {
          let data:any = app.payload.data();
          this.isUserPropietary(data.creator);
          this.app = new App(app.payload.id, data.name, data.creator);
          this.charCriteria = [];
          this.activeCriteria = [];
          this.activeCriteriaValues = [];
          this.activeCriteriaDetails = [];
          this.comments = [];
          let criteria = this.arraykit.objectToArray(data.criteria);
          let hasComment  = [];

          let value = [];
          let number = [];

          let evaluations = this.arraykit.objectToArray(data.evaluation);
          evaluations.forEach(
            ev => {
              criteria.forEach(
                cr => {
                    if(ev[cr.name] > -1){
                      value[cr.name] = value[cr.name]? value[cr.name] + ev[cr.name]: ev[cr.name];
                      number[cr.name] = number[cr.name]? number[cr.name]+1:1;
                    }
                }
              )
              if(ev['comment'] != "")
                this.comments.push( new Comment(ev['name'],ev['comment'],new Date(ev['date'].seconds* 1000)));
            }
          );
          criteria.forEach(
            cr => {
              if(cr.active){
                this.translate.get('APP_CONFIG.'+cr.name).subscribe(t => {
                  this.charCriteria.push(t);
                });

                this.activeCriteria.push(cr.name);
                this.activeCriteriaDetails.push(new CriteriaDetail(cr.name,value[cr.name]/number[cr.name],this.isValueValid(cr.name, value[cr.name]/number[cr.name]),number[cr.name]))
                this.activeCriteriaValues.push(value[cr.name]/number[cr.name]);
              }
            }
          )
          this.chartLoader();

      });
  }

  isUserPropietary(creator){
    if(this.fireAuth.auth.currentUser.uid != creator){
        this.router.navigateByUrl('/main');
    }
  }

  isValueValid(name,value){
    return value >= 50;
  }

  ngOnInit() {

  }

  openMenu() {
    this.menu.open('end');
  }

  copy(){
    this.clipboard.copy(this.app.id);
    this.presentToast();
  }

  async presentToast() {

    let copied;

    this.translate.get('APP_CONFIG.copied').subscribe(t => {
      copied = t;
    });

    const toast = await this.toastController.create({
      message: copied,
      duration: 1500
    });
    toast.present();
  }

  marksData:any;

  chartLoader() {
    this.marksData = {
      labels: this.charCriteria,
      datasets: [{
        label: this.app.name,
        radius: 0,
        backgroundColor: "#3880ff",
        data: this.activeCriteriaValues
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

  async criteriaChange(){

    let a: any = {};

    this.translate.get('APP_CONFIG.perception').subscribe(t => {
      a.perception = t;
    });
    this.translate.get('APP_CONFIG.ergonomics').subscribe(t => {
      a.ergonomics = t;
    });
    this.translate.get('APP_CONFIG.presence').subscribe(t => {
      a.presence = t;
    });
    this.translate.get('APP_CONFIG.availability').subscribe(t => {
      a.availability = t;
    });
    this.translate.get('APP_CONFIG.easy').subscribe(t => {
      a.easy = t;
    });

    this.translate.get('ALERT.cancel').subscribe(t => {
      a.cancel = t;
    });
    this.translate.get('ALERT.confirm').subscribe(t => {
      a.confirm = t;
    });
    this.translate.get('APP_CONFIG.error_no_select').subscribe(t => {
      a.error_no_select = t;
    });

    const alert = await this.alertController.create({
      header: 'Change Criteria',
      inputs: [
        {
          name: 'perception',
          type: 'checkbox',
          label: a.perception,
          value: 'perception',
          checked: (this.activeCriteria.indexOf("perception") > -1)
        },
        {
          name: 'ergonomics',
          type: 'checkbox',
          label: a.ergonomics,
          value: 'ergonomics',
          checked: (this.activeCriteria.indexOf("ergonomics") > -1)
        },
        {
          name: 'presence',
          type: 'checkbox',
          label: a.presence,
          value: 'presence',
          checked: (this.activeCriteria.indexOf("presence") > -1)
        },
        {
          name: 'availability',
          type: 'checkbox',
          label: a.availability,
          value: 'availability',
          checked: (this.activeCriteria.indexOf("availability") > -1)
        },
        {
          name: 'easy',
          type: 'checkbox',
          label: a.easy,
          value: 'easy',
          checked: (this.activeCriteria.indexOf("easy") > -1)
        }
      ],
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
            if(ref.indexOf("perception") + ref.indexOf("ergonomics") + ref.indexOf("presence") + ref.indexOf("availability") + ref.indexOf("easy") < 0){
              this.showError(a.error_no_select);
            }else{
              let criteria = {
                perception: ref.indexOf("perception") > -1,
                ergonomics: ref.indexOf("ergonomics") > -1,
                presence: ref.indexOf("presence") > -1,
                availability: ref.indexOf("availability") > -1,
                easy: ref.indexOf("easy") > -1,
              };
              this.appfacade.changeAppActiveCriteria(this.app.id,criteria);
            }

          }
        }
      ]
    });
    await alert.present();
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

  async nameChange(){

    let a: any = {};

    this.translate.get('APP_CONFIG.change_name_header').subscribe(t => {
      a.change_name_header = t;
    });

    this.translate.get('ALERT.cancel').subscribe(t => {
      a.cancel = t;
    });

    this.translate.get('ALERT.confirm').subscribe(t => {
      a.confirm = t;
    });

    const alert = await this.alertController.create({
      header: a.change_name_header,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.app.name
        }],
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
            this.appfacade.changeAppName(this.app.id,ref.name);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteApp(){

    let a: any = {};

    this.translate.get('APP_CONFIG.delete_app_header').subscribe(t => {
      a.delete_app_header = t;
    });

    this.translate.get('APP_CONFIG.delete_app_text').subscribe(t => {
      a.delete_app_text = t;
    });

    this.translate.get('ALERT.cancel').subscribe(t => {
      a.cancel = t;
    });

    this.translate.get('ALERT.confirm').subscribe(t => {
      a.confirm = t;
    });

    const alert = await this.alertController.create({
      header: a.delete_app_header,
      message: a.delete_app_text+ this.app.name +'?',
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
            this.appfacade.removeApp(this.app.id);
            this.router.navigateByUrl("/apps");
          }
        }
      ]
    });
    await alert.present();
  }

}
