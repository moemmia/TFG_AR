import { Component, OnInit, NgZone} from '@angular/core';
import { AlertController, LoadingController  } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{


  loader:any;
  constructor(private loadingController: LoadingController,private fireAuth: AngularFireAuth, public alertController: AlertController, private router: Router, private zone: NgZone) {}

  ngOnInit(){
    this.presentLoading();
    this.fireAuth.auth.onAuthStateChanged((user) => {
     if (user) {
       this.zone.run(async () => {
         this.loader.dismiss();
         this.router.navigateByUrl('/main');
       });
     }else{
       this.loader.dismiss();
     }
    });
  }

  async presentLoading() {
   this.loader = await this.loadingController.create({ cssClass: 'loader' });
   this.loader.present();
 }

}
