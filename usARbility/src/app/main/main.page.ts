import { Component, OnInit } from '@angular/core';

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
      url:'main#'
    },
    {
      name:'Sign out',
      icon:'exit',
      url:'home'
    }
  ];



  constructor() {
  }

  ngOnInit(){

  }

}
