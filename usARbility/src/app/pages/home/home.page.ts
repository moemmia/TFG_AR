import { Component, OnInit, NgZone} from '@angular/core';
import { AlertController  } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {LoaderController} from '../../tools/loadercontroller';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{


  loader:any;
  constructor(private loaderController: LoaderController,private fireAuth: AngularFireAuth, public alertController: AlertController, private router: Router, private zone: NgZone) {}

  ngOnInit(){
    this.loaderController.show();
    this.fireAuth.auth.onAuthStateChanged((user) => {
     if (user) {
       this.zone.run(async () => {
         this.loaderController.hide();
         this.router.navigateByUrl('/main');
       });
     }else{
        this.loaderController.hide();
     }
    });
  }

}
