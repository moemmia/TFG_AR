import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {LoaderController} from '../../../tools/loadercontroller';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private translate: TranslateService, private loaderController: LoaderController, private fireAuth: AngularFireAuth, public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }


  register(){

        let a: any = {};

        this.translate.get('HOME.REGISTER.no_equal_pass').subscribe(t => {
          a.no_equal_pass = t;
        });

      if($("#register_password").val() == $("#register_rep_password").val()){
        this.loaderController.show();
        this.fireAuth.auth.createUserWithEmailAndPassword($("#register_email").val(),$("#register_password").val())
        .then( data => {
            this.loaderController.hide();
            this.router.navigateByUrl('/main');
        })
        .catch( error => {

            let err;
            switch(error.code){
              case "auth/invalid-email" :
                this.translate.get('HOME.REGISTER.error_invalid_email').subscribe(t => {
                  err = t;
                });
                break;
              case "auth/weak-password":
                this.translate.get('HOME.REGISTER.error_weak_password').subscribe(t => {
                  err = t;
                });
                break;
              case "auth/email-already-in-use":
                this.translate.get('HOME.REGISTER.error_email_already_used').subscribe(t => {
                  err = t;
                });
                break;
              default:
                err = error.message;
            }

            this.loaderController.hide();
            this.showError(err);
        });
      }
      else{
        this.showError(a.no_equal_pass);
      }
  }

  async showError(error){

    let a: any = {};

    this.translate.get('ALERT.ok').subscribe(t => {
      a.ok = t;
    });

    this.translate.get('ALERT.error').subscribe(t => {
      a.error = t;
    });

     const alert = await this.alertController.create({
      header: a.error,
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
}
