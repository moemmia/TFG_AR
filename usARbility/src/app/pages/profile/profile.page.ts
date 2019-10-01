import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AppFacade} from '../../tools/appfacade';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private alive = true;

  constructor(private fireAuth: AngularFireAuth, private alertController: AlertController, private appfacade:AppFacade, private router: Router) {
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
    let user=this.fireAuth.auth.currentUser;
    if(user){
      this.fireAuth.auth.sendPasswordResetEmail(user.email);
      this.showMessage("An email has been sended to "+ this.email,"Well Done");
    }
  }

  async showMessage(error,header){
     const alert = await this.alertController.create({
      header: header,
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }

  async deleteAccount(){
    const alert = await this.alertController.create({
      header: 'Account Deletion',
      message: 'Are you sure you want to delete your account?',
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
