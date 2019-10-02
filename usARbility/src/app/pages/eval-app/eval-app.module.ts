import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EvalAppPage } from './eval-app.page';

import {TranslateModule} from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: EvalAppPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [EvalAppPage]
})
export class EvalAppPageModule {}
