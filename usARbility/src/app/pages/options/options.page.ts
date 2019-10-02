import { Component, OnInit } from '@angular/core';
import {DarkThemer} from '../../tools/darkthemer';
import * as $ from 'jquery';

import {Translate} from '../../tools/translate';


@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  private darkmode;
  languages = [];
  currentlang;

  constructor(private translate: Translate,private darkthemer:DarkThemer) {
    this.darkmode= this.darkthemer.isDarkScheme();
    this.languages = this.translate.getLanguages();
    this.currentlang = this.translate.getCurrentLanguage();
  }

  ngOnInit() {

  }

  setDarkMode($event){
    this.darkthemer.setDarkScheme($event.detail.checked);
    this.darkmode = $event.detail.checked;
  }

  setLanguage(lang){
    console.log("good")
    this.translate.setLanguage(lang);
  }
}
