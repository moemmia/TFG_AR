import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.page.html',
  styleUrls: ['./evaluate.page.scss'],
})
export class EvaluatePage implements OnInit {

  constructor(private fireAuth: AngularFireAuth, public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  loginAnon(){
    this.fireAuth.auth.signInAnonymously()
    .then( data => {
      console.log('got data',data);
    })
    .catch( error => {
      this.showError(error.message)
    });
  }

}
