import { Component, OnInit } from '@angular/core';
import {DarkThemer} from '../../tools/darkthemer';
import * as $ from 'jquery';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  private darkmode;

  constructor(private darkthemer:DarkThemer) {
  }

  ngOnInit() {
    this.darkmode= this.darkthemer.isDarkScheme();
  }

  SetDarkMode($event){
    this.darkthemer.setDarkScheme($event.detail.checked);
    this.darkmode = $event.detail.checked;
  }
}
