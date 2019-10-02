import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyEvaluationsPage } from './my-evaluations.page';

import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: MyEvaluationsPage
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
  declarations: [MyEvaluationsPage]
})
export class MyEvaluationsPageModule {}
