import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppFacade, App} from '../../tools/appfacade';
import { AlertController } from '@ionic/angular';
import {DarkThemer} from '../../tools/darkthemer';
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

  constructor(private route: ActivatedRoute, private appfacade:AppFacade, private darkthemer:DarkThemer) {
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
        backgroundColor: this.darkthemer.isDarkScheme()? "rgba(22,50,100,0.8)":"rgba(22,50,100,0.5)",
        data: [65, 75, 70, 80, 60]
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

}
