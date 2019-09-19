import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppFacade, App} from '../../tools/appfacade';
import { AlertController } from '@ionic/angular';
import * as $ from 'jquery';
import { Chart } from 'chart.js';

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

  constructor(private route: ActivatedRoute, private appfacade:AppFacade) {
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

  loadInfo(){
    this.appfacade.getAppById(this.id).snapshotChanges().subscribe(
      app => {
          let data:any = app.payload.data();
          console.log(data)
          this.app = new App( app.payload.id, data.name, data.creator);
          this.chartLoader();
      });
  }

  ngOnInit() {

  }

  marksData:any;

  chartLoader() {
    this.marksData = {
      labels: ["Perception", "Ergonomics", "Presence", "Availability", "Easy to use"],
      datasets: [{
        label: this.app.name,
        radius: 0,
        backgroundColor: "rgba(22,50,100,0.5)",
        data: [65, 75, 70, 80, 60]
      }, {
        label: "World Median",
        radius: 0,
        backgroundColor: "rgba(71,0,21,0.3)",
        data: [54, 65, 60, 70, 70]
      }]
    };
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'radar',
      data: this.marksData,
      options: {
        legend: {
            labels: {
                //fontColor: 'black',
                fontStyle: "bold",
            }
        },
        scale: {
            pointLabels :{
                //fontColor: 'black',
                fontStyle: "bold"
            },ticks: {
                beginAtZero: true,
                max: '100',
                callback: function() {return ""},
                backdropColor: "rgba(0, 0, 0, 0)"
            }
        },
        aspectRatio: "1.5",
        responsive: false,
      }
    });
  }
}
