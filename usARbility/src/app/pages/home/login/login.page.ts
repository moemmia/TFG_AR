import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {LoaderController} from '../../../tools/loadercontroller';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LogInPage implements OnInit {

  constructor(private translate: TranslateService, private loaderController: LoaderController, private fireAuth: AngularFireAuth, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  login() {
      this.loaderController.show();
      this.fireAuth.auth.signInWithEmailAndPassword($("#log_email").val(),$("#log_password").val())
      .then( data => {
          this.loaderController.hide();
          this.router.navigateByUrl('/main');
      })
      .catch( error => {
        this.loaderController.hide();
        let err;
        switch(error.code){
          case "auth/invalid-email" :
            this.translate.get('HOME.LOGIN.error_invalid_email').subscribe(t => {
              err = t;
            });
            break;
          case "auth/wrong-password":
            this.translate.get('HOME.LOGIN.error_wrong_password').subscribe(t => {
              err = t;
            });
            break;
          case "auth/user-not-found":
            this.translate.get('HOME.LOGIN.error_user_not_found').subscribe(t => {
              err = t;
            });
            break;
          default:
            err = error.message;
        }
        this.showError(err);
      });
  }

  async showError(error,header=''){

      let a: any = {};

      this.translate.get('ALERT.ok').subscribe(t => {
        a.ok = t;
      });

      if(header == ""){
        this.translate.get('ALERT.error').subscribe(t => {
          header = t;
        });
      }

     const alert = await this.alertController.create({
      header: header,
      message: error,
      buttons: [a.ok]
    });

    await alert.present();
  }

  showHide(id){
    if($("#"+id).attr("type") == "password"){
      $("#"+id).attr("type","text");
      $("#"+id+"_eye").attr("name","eye");
    }else{
      $("#"+id).attr("type","password");
      $("#"+id+"_eye").attr("name","eye-off");
    }
  }

  async fpass(){

    let a: any = {};

    this.translate.get('HOME.LOGIN.pass_header').subscribe(t => {
      a.header = t;
    });

    this.translate.get('HOME.LOGIN.sended_email').subscribe(t => {
      a.sended = t;
    });

    this.translate.get('HOME.LOGIN.thanks').subscribe(t => {
      a.thanks = t;
    });

    this.translate.get('HOME.LOGIN.placeholder_email').subscribe(t => {
      a.placeholder = t;
    });

    this.translate.get('ALERT.cancel').subscribe(t => {
      a.cancel = t;
    });

    this.translate.get('ALERT.confirm').subscribe(t => {
      a.confirm = t;
    });

    const alert = await this.alertController.create({
      header: a.header,
      inputs: [
        {
          name: "email",
          type: 'text',
          placeholder: a.placeholder
        }],
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
            this.fireAuth.auth.sendPasswordResetEmail(ref.email).then( data => {
                this.showError(a.sended+ref.email,a.thanks);
            })
            .catch( error => {
              let err;
              switch(error.code){
                case "auth/invalid-email" :
                  this.translate.get('HOME.LOGIN.error_invalid_email').subscribe(t => {
                    err = t;
                  });
                  break;
                case "auth/user-not-found":
                  this.translate.get('HOME.LOGIN.error_user_not_found').subscribe(t => {
                    err = t;
                  });
                  break;
                default:
                  err = error.message;
              }
              this.showError(err);
            });
          }
        }
      ]
    });
    await alert.present();
  }


}
