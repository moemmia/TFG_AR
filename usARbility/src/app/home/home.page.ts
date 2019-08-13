import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private fire: AngularFireAuth, public alertController: AlertController) {}

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
    //Comprobar si el usuario ya esta logueado, y en caso afirmativo pasar a la siguiente página.
    this.showTab("evaluate");
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
        this.fire.auth.createUserWithEmailAndPassword($("#register_email").val(),$("#register_password").val())
        .then( data => {
            console.log('got data',data);
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
    this.fire.auth.signInWithEmailAndPassword($("#log_email").val(),$("#log_password").val())
    .then( data => {
      console.log('got data',data);
    })
    .catch( error => {
      this.showError(error.message);
    });
  }

  loginAnon(){
    firebase.auth().signInAnonymously()
    .then( data => {
      console.log('got data',data);
    })
    .catch( error => {
      this.showError(error.message)
    });
  }
}
