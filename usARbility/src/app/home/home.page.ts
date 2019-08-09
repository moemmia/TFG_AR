import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor() {}

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

}
