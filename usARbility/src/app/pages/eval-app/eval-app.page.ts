import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions, PickerButton } from '@ionic/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-eval-app',
  templateUrl: './eval-app.page.html',
  styleUrls: ['./eval-app.page.scss'],
})
export class EvalAppPage implements OnInit {

  constructor(private pickerCtrl: PickerController, private router: Router) { }

  ngOnInit() {
  }

  next(){
    //Comprobar que existe la app y enviar info a la siguiente pagina
    this.router.navigateByUrl("/eval-selection");
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
