import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppFacade, App} from '../../tools/appfacade';
import { MenuController, AlertController, ToastController  } from '@ionic/angular';
import {DarkThemer} from '../../tools/darkthemer';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Chart } from 'chart.js';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.page.html',
  styleUrls: ['./app-config.page.scss'],
})
export class AppConfigPage implements OnInit {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  id: any;
  app: App;
  activeCriteria: Array<string> = [];
  activeCriteriaValues: Array<number> = [];
  activeCriteriaDetails: Array<CriteriaDetail> = [];
  comments: Array<Comment> = [];

  constructor(private clipboard: Clipboard, private router: Router, private toastController: ToastController, private route: ActivatedRoute, private appfacade:AppFacade, private darkthemer:DarkThemer, private menu: MenuController, private alertController: AlertController) {
    Chart.Legend.prototype.afterFit = function() {
        this.height = this.height + 25;
    };
    route.params.subscribe(
      (params) => {
        this.id = params['id'];
        this.loadInfo();
      },
    );
  }

  show(id){
      $("#"+id+"-text").attr("hide",$("#"+id+"-text").attr("hide")=="true"?false:true);
      $("#"+id+"-arrow").attr("name",$("#"+id+"-text").attr("hide")=="true"?"arrow-dropdown":"arrow-dropup");
  }

  loadInfo(){
    this.appfacade.getAppById(this.id).snapshotChanges().subscribe(
      app => {
          let data:any = app.payload.data();
          this.app = new App(app.payload.id, data.name, data.creator);
          this.activeCriteria = [];
          this.activeCriteriaValues = [];
          this.activeCriteriaDetails = [];
          this.comments = [];
          let criteria = this.objectToArray(data.criteria);
          let hasComment=false;
          criteria.forEach(
            cr => {
              if(cr.active){
                this.activeCriteria.push(cr.name);
                let value=0;
                let number=0;
                let evaluations = this.objectToArray(data.evaluation);
                evaluations.forEach(
                  ev => {
                    value += ev[cr.name];
                    number ++;
                    if(!hasComment) {
                      this.comments.push( new Comment(ev['name'],ev['comment']));
                      hasComment=true;
                    }
                  }
                );
                this.activeCriteriaDetails.push(new CriteriaDetail(cr.name,value,this.isValueValid(cr.name, value)))
                this.activeCriteriaValues.push(value/number);
              }
            }
          );

          this.chartLoader();
      });
  }

  isValueValid(name,value){
    return value >= 50;
  }

  objectToArray(obj) {
    if (typeof(obj) === 'object') {
      var keys = Object.keys(obj);
      var allObjects = keys.every(x => typeof(obj[x]) === 'object');
      if (allObjects) {
        return keys.map(x => this.objectToArray(obj[x]));
      } else {
        var o = {};
        keys.forEach(x => {
          o[x] = this.objectToArray(obj[x])
        });
        return o;
      }
    } else {
      return obj;
    }
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
    const toast = await this.toastController.create({
      message: 'Id Copied to clipboard.',
      duration: 1500
    });
    toast.present();
  }

  marksData:any;

  chartLoader() {
    this.marksData = {
      labels: this.activeCriteria,
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
  }

  async criteriaChange(){
    const alert = await this.alertController.create({
      header: 'Change Criteria',
      inputs: [
        {
          name: 'perception',
          type: 'checkbox',
          label: 'Perception',
          value: 'perception',
          checked: (this.activeCriteria.indexOf("perception") > -1)
        },
        {
          name: 'ergonomics',
          type: 'checkbox',
          label: 'Ergonomics',
          value: 'ergonomics',
          checked: (this.activeCriteria.indexOf("ergonomics") > -1)
        },
        {
          name: 'presence',
          type: 'checkbox',
          label: 'Presence',
          value: 'presence',
          checked: (this.activeCriteria.indexOf("presence") > -1)
        },
        {
          name: 'availability',
          type: 'checkbox',
          label: 'Availability',
          value: 'availability',
          checked: (this.activeCriteria.indexOf("availability") > -1)
        },
        {
          name: 'easy',
          type: 'checkbox',
          label: 'Easy to use',
          value: 'easy',
          checked: (this.activeCriteria.indexOf("easy") > -1)
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Confirm',
          handler: (ref) => {
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
      ]
    });
    await alert.present();
  }

  async nameChange(){
    const alert = await this.alertController.create({
      header: 'Change Name',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.app.name
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Confirm',
          handler: (ref) => {
            this.appfacade.changeAppName(this.app.id,ref.name);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteApp(){
    const alert = await this.alertController.create({
      header: 'App Deletion',
      message: 'Are you sure you want to delete "'+ this.app.name +'"?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Confirm',
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

export class Comment
{
  name: string;
  comment: string;

  public constructor(name,comment){
    this.comment= comment;
    this.name= name;
  }
}


export class CriteriaDetail
{
  name: string;
  value: number;
  valid: boolean;

  public constructor(name,value,valid){
    this.value= value;
    this.name= name;
    this.valid=valid;
  }
}
