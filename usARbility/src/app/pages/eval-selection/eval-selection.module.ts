import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EvalSelectionPage } from './eval-selection.page';
import { EvaluationPage } from './evaluation/evaluation.page';

import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: EvalSelectionPage
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
  declarations: [EvalSelectionPage, EvaluationPage],
  entryComponents: [EvaluationPage]
})
export class EvalSelectionPageModule {}
