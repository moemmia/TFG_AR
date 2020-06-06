import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController, AlertController, IonContent   } from '@ionic/angular';
import {AppFacade, App, QuestionDetail} from '../../../tools/appfacade';
import { ArrayKit } from '../../../tools/arraykit';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import * as $ from 'jquery';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-explanations',
  templateUrl: './explanations.page.html',
  styleUrls: ['./explanations.page.scss'],
})
export class ExplanationsPage implements OnInit {

  @ViewChild(IonContent ) content: IonContent ;

  private alive = true;

  constructor(private translate: TranslateService, public modalController: ModalController, private router: Router) {}

  dismiss() {
    this.alive = false;
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
  }

}

export class AExplanationsPage extends ExplanationsPage {}
