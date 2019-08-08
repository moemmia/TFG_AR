import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-eval-selection',
  templateUrl: './eval-selection.page.html',
  styleUrls: ['./eval-selection.page.scss'],
})
export class EvalSelectionPage implements OnInit {

  constructor() { }

  show(id){
      $("#"+id+"-text").attr("hide",$("#"+id+"-text").attr("hide")=="true"?false:true);
  }

  ngOnInit(){

  }

}
