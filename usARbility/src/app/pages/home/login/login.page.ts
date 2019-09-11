import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LogInPage implements OnInit {

  constructor(private fireAuth: AngularFireAuth, public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  login() {
      this.fireAuth.auth.signInWithEmailAndPassword($("#log_email").val(),$("#log_password").val())
      .then( data => {
          this.router.navigateByUrl('/main');
      })
      .catch( error => {
        this.showError(error.message);
      });
  }

  async showError(error){
     const alert = await this.alertController.create({
      header: 'Error',
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

}
