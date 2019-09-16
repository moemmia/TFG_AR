import { Injectable } from '@angular/core';
import { LoadingController  } from '@ionic/angular';

@Injectable()
export class LoaderController{

  loader:any;

  constructor(private loadingController: LoadingController) {
    this.loader = this.loadingController.create({ cssClass: 'loader' });
  }

  hide(){
    this.loader.then(ref => ref.dismiss());
  }

  show() {
    this.loader.then(ref => ref.present());
  }

}
