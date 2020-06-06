import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExplanationsPage } from './explanations.page';

import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ExplanationsPage
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
  declarations: [ExplanationsPage]
})
export class ExplanationsPageModule {}
