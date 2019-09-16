import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {LoaderController} from '../../../tools/loadercontroller';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LogInPage implements OnInit {

  constructor(private loaderController: LoaderController, private fireAuth: AngularFireAuth, public alertController: AlertController, private router: Router) { }

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
        this.showError(error.message);
      });
  }

  async showError(error,header='Error'){
     const alert = await this.alertController.create({
      header: header,
      message: error,
      buttons: ['OK']
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
    const alert = await this.alertController.create({
      header: 'Password Reset',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'example@domain.com'
        }],
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
            this.fireAuth.auth.sendPasswordResetEmail(ref.email).then( data => {
                this.showError("email sent successfully to "+ref.email,"Thank you");
            })
            .catch( error => {
                this.showError(error.message);
            });
          }
        }
      ]
    });
    await alert.present();
  }


}
