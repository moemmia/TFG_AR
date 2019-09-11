import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private fireAuth: AngularFireAuth, public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }


  register(){
      if($("#register_password").val() == $("#register_rep_password").val()){
        this.fireAuth.auth.createUserWithEmailAndPassword($("#register_email").val(),$("#register_password").val())
        .then( data => {
            this.router.navigateByUrl('/main');
        })
        .catch( error => {
            this.showError(error.message);
        });
      }
      else{
        this.showError("'password' and 'repeated password' must be equal");
      }
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
