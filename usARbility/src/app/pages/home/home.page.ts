import { Component, OnInit, NgZone} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  constructor(private fireAuth: AngularFireAuth, public alertController: AlertController, private router: Router, private zone: NgZone) {}

  ngOnInit(){
    this.fireAuth.auth.onAuthStateChanged((user) => {
     if (user) {
       this.zone.run(async () => {
         this.router.navigateByUrl('/main');
       });
     }
    });
  }
}
