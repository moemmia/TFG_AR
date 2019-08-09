import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-eval-selection',
  templateUrl: './eval-selection.page.html',
  styleUrls: ['./eval-selection.page.scss'],
})
export class EvalSelectionPage implements OnInit {

  lorem = "Lorem ipsum dolor sit amet consectetur adipiscing elit posuere odio, lectus sollicitudin nulla commodo curae ultricies rutrum eu per mus, diam quisque ac iaculis semper dignissim arcu gravida. Netus morbi augue enim litora auctor magna elementum ullamcorper, inceptos in ut habitant mus a sociis montes himenaeos, dapibus purus rhoncus nam lacus molestie laoreet. Tellus aenean inceptos feugiat convallis nec ac vehicula erat lacinia, nunc tincidunt laoreet fringilla porttitor senectus fames cum vestibulum sollicitudin, gravida magnis felis arcu aptent tristique pulvinar ultrices.";

  list = [
    {
      title: 'perception',
      name: 'perception',
      text: this.lorem
    },
    {
      title: 'ergonomics',
      name: 'ergonomics',
      text: this.lorem
    },
    {
      title: 'presence',
      name: 'presence',
      text: this.lorem
    },
    {
      title: 'availability',
      name: 'availability',
      text: this.lorem
    },
    {
      title: 'easy to use',
      name: 'easy',
      text: this.lorem
    }
  ];

  constructor() { }

  show(id){
      $("#"+id+"-text").attr("hide",$("#"+id+"-text").attr("hide")=="true"?false:true);
  }

  ngOnInit(){

  }

}
