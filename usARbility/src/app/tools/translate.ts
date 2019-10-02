import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class Translate{

  selected = '';

  constructor(private translate:TranslateService, private storage: Storage) { }

  setInitialAppLanguage(){
    let language= this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);

    this.storage.get(LNG_KEY).then(
      val => {
        if(val){
          this.setLanguage(val);
          this.selected=val;
        }
      }
    )
  }

  getLanguages(){
    return[
      {text: 'English', value: 'en'},
      {text: 'Spanish', value: 'es'}
    ];
  }

  getCurrentLanguage(){
    return this.translate.currentLang? this.translate.currentLang: this.translate.defaultLang;
  }

  setLanguage(lng){
    this.translate.use(lng);
    this.selected=lng;
      this.storage.set(LNG_KEY,lng);
  }

}
