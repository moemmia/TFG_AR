import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'main', loadChildren: './pages/main/main.module#MainPageModule' },
  { path: 'eval-selection', loadChildren: './pages/eval-selection/eval-selection.module#EvalSelectionPageModule' },
  { path: 'evaluation', loadChildren: './pages/evaluation/evaluation.module#EvaluationPageModule' },
  { path: 'statistics', loadChildren: './pages/statistics/statistics.module#StatisticsPageModule' },
  { path: 'options', loadChildren: './pages/options/options.module#OptionsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
