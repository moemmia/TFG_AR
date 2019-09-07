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

  showTab(id){
    //Seleccionar boton pulsado
    $(".tab").each(function(){
      $(this).attr("selected",false);
    }).promise().done( function(){
      $("#tab-button-"+id).attr("selected",true);
    });

    //Animaciones divs
    var found=false;
    $(".content").each(function(){
      $(this).attr("gofrom",$(this).attr("goto"));
      if($(this).attr('id') == id){
        found=true;
        $(this).attr("goto","");
      }else{
        if(!found){
          $(this).attr("goto","left");
        }else{
          $(this).attr("goto","right");
        }
      }
    });
  }

  ngOnInit(){
    this.showTab("evaluate");
    this.fireAuth.auth.onAuthStateChanged((user) => {
     if (user) {
       this.zone.run(async () => {
         this.router.navigateByUrl('/main');
       });
     }
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

  login() {
      this.fireAuth.auth.signInWithEmailAndPassword($("#log_email").val(),$("#log_password").val())
      .then( data => {
          this.router.navigateByUrl('/main');
      })
      .catch( error => {
        this.showError(error.message);
      });
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
