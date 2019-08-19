import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as $ from 'jquery';

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
      click: ()=>{}
    },
    {
      name:'Settings',
      icon:'settings',
      click: ()=>{this.navigate("/options")}
    },
    {
      name:'Sign out',
      icon:'exit',
      click: ()=>{this.logout()}
    }
  ];

  constructor(private fire: AngularFireAuth, private router: Router) {
  }

  ngOnInit(){

  }

  navigate(url){
    this.router.navigateByUrl(url);
  }

  logout() {
    this.fire.auth.signOut().then( data => {
          this.navigate('/home');
    })
  }

}
