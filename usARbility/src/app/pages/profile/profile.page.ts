import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AppFacade} from '../../tools/appfacade';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private alive = true;

  constructor(private translate: TranslateService,private fireAuth: AngularFireAuth, private alertController: AlertController, private appfacade:AppFacade, private router: Router) {
    let user=this.fireAuth.auth.currentUser;
    if(user!=null){
      this.email = this.fireAuth.auth.currentUser.email;
    }else{
      this.fireAuth.auth.onAuthStateChanged((user) => {
       if (user) {
         this.email = user.email;
       }
      });
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  email = " ";

  ngOnInit() {

  }

  resetPassword(){

    let a: any = {};

    this.translate.get('PROFILE.sended_email').subscribe(t => {
      a.text = t;
    });

    this.translate.get('PROFILE.well').subscribe(t => {
      a.well = t;
    });

    let user=this.fireAuth.auth.currentUser;
    if(user){
      this.fireAuth.auth.sendPasswordResetEmail(user.email);
      this.showMessage(a.text+ this.email,a.well);
    }
  }

  async showMessage(error,header){

    let a: any = {};

    this.translate.get('ALERT.ok').subscribe(t => {
      a.ok = t;
    });

     const alert = await this.alertController.create({
      header: header,
      message: error,
      buttons: [a.ok]
    });

    await alert.present();
  }

  async deleteAccount(){

    let a: any = {};

    this.translate.get('PROFILE.deletion_header').subscribe(t => {
      a.header = t;
    });

    this.translate.get('PROFILE.deletion_message').subscribe(t => {
      a.message = t;
    });

    this.translate.get('ALERT.cancel').subscribe(t => {
      a.cancel = t;
    });

    this.translate.get('ALERT.confirm').subscribe(t => {
      a.confirm = t;
    });

    const alert = await this.alertController.create({
      header: a.header,
      message: a.message,
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
            this.appfacade.getAppsCreatedByCurrentUser(this.fireAuth.auth.currentUser.uid).snapshotChanges().pipe(takeWhile(() => this.alive)).subscribe(
              x => {
                x.forEach( app => {
                  this.appfacade.removeApp(app.payload.doc.id);
                });
                let route = this.router;
                this.fireAuth.auth.currentUser.delete().then( function(){
                  route.navigateByUrl("/home");
                });
                this.alive = false;
              }
            );

          }
        }
      ]
    });
    await alert.present();
  }


}
