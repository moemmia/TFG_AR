import { Renderer2, RendererFactory2, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DarkThemer{

    private renderer;

    private isDarkSchemeActive=false;

    public constructor(private rendererFactory: RendererFactory2, private storage: Storage){
      this.renderer = rendererFactory.createRenderer(null, null);
      this.storage.get('dark-theme').then(value =>{
        this.setDarkScheme(value);
      });
    }

    setDarkScheme(theme){
      if(theme != null){
        this.storage.set('darkmode', theme);
        this.isDarkSchemeActive = theme;
        if(theme){
          this.renderer.addClass(document.body, 'dark-theme');
        }else{
          this.renderer.removeClass(document.body, 'dark-theme');
        }
      }
    }

    isDarkScheme(){
      return this.isDarkSchemeActive;
    }
}
