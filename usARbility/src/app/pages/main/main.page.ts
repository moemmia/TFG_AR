import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  menuitems= [
    {
      name:'Profile',
      icon:'person',
      url:'main#'
    },
    {
      name:'Settings',
      icon:'settings',
      url:'/options'
    },
    {
      name:'Sign out',
      icon:'exit',
      url:'/home'
    }
  ];



  constructor(private fire: AngularFireAuth) {
  }

  ngOnInit(){

  }

  logout() {
    this.fire.auth.signOut();
  }

}
