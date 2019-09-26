import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppFacade, App, Comment, CriteriaDetail} from '../../tools/appfacade';
import { MenuController, AlertController, ToastController  } from '@ionic/angular';
import {DarkThemer} from '../../tools/darkthemer';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';
import { Chart } from 'chart.js';
import { Clipboard } from '@ionic-native/clipboard/ngx';


@Component({
  selector: 'app-eval-config',
  templateUrl: './eval-config.page.html',
  styleUrls: ['./eval-config.page.scss'],
})
export class EvalConfigPage implements OnInit {

  currentUserId:string;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  id: any;
  app: App;
  criteria: Array<string> = [];
  criteriaValues: Array<number> = [];
  criteriaDetails: Array<CriteriaDetail> = [];
  comment: Comment;

  constructor(private clipboard: Clipboard, private router: Router, private toastController: ToastController, private route: ActivatedRoute, private appfacade:AppFacade, private darkthemer:DarkThemer, private menu: MenuController, private alertController: AlertController, private fireAuth: AngularFireAuth) {
    Chart.Legend.prototype.afterFit = function() {
        this.height = this.height + 25;
    };
    route.params.subscribe(
      (params) => {
        this.id = params['id'];
        this.loadInfo();
      },
    );

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
          this.criteria = [];
          this.criteriaValues = [];
          this.criteriaDetails = [];
          let criteria = this.objectToArray(data.criteria);
          let hasComment=false;
          let evaluations = this.objectToArray(data.evaluation);
          evaluations.forEach(
              ev => {
                criteria.forEach(
                cr => {
                    this.criteria.push(cr.name);
                    this.criteriaDetails.push(new CriteriaDetail(cr.name,ev[cr.name],this.isValueValid(cr.name, ev[cr.name])));
                    this.criteriaValues.push(ev[cr.name]);
                });
                this.comment = new Comment(ev['name'],ev['comment'],new Date(ev['date'].seconds* 1000));
          });
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
  }

  redoEval(){

  }

  async commentChange(){
    const alert = await this.alertController.create({
      header: 'Change Name',
      inputs: [
        {
          name: 'comment',
          type: 'text',
          placeholder: this.comment.comment
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
            this.appfacade.changeEvalComment(this.app.id,this.currentUserId,ref.comment);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteEval(){
    const alert = await this.alertController.create({
      header: 'Evaluation Deletion',
      message: 'Are you sure you want to delete your "'+ this.app.name +'" evaluation?',
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
            this.appfacade.removeEvaluation(this.app.id,this.currentUserId);
            this.router.navigateByUrl("/my-evaluations");
          }
        }
      ]
    });
    await alert.present();
  }

}
