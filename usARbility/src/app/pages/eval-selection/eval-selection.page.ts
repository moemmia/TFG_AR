import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions, PickerButton } from '@ionic/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-eval-selection',
  templateUrl: './eval-selection.page.html',
  styleUrls: ['./eval-selection.page.scss'],
})
export class EvalSelectionPage implements OnInit {

  lorem = "Lorem ipsum dolor sit amet consectetur adipiscing elit class metus aliquet, platea ullamcorper nibh aptent placerat varius sociis lobortis. Euismod volutpat sollicitudin ultricies donec nec eu tincidunt proin senectus, cum conubia fusce himenaeos faucibus mattis risus iaculis, ut litora netus suscipit ac sagittis potenti vulputate.";

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

  constructor(private pickerCtrl: PickerController) { }

  show(id){
      $("#"+id+"-text").attr("hide",$("#"+id+"-text").attr("hide")=="true"?false:true);
      $("#"+id+"-arrow").attr("name",$("#"+id+"-text").attr("hide")=="true"?"arrow-dropdown":"arrow-dropup");
  }

  ngOnInit(){

  }

  async search(){
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Select',
          handler: (selected) => {
                $("ion-input").val(selected.apps.value);
          }
        }
      ],
      columns: [
        {
          name: 'apps',
          options: [
            { text: 'Your App1', value: 'A' },
            { text: 'Your App2', value: 'B' },
            { text: 'Your App3', value: 'C' }
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
  }

}
