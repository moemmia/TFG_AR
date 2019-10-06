import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'main', loadChildren: './pages/main/main.module#MainPageModule' },
  { path: 'eval-selection', loadChildren: './pages/eval-selection/eval-selection.module#EvalSelectionPageModule' },
  { path: 'options', loadChildren: './pages/options/options.module#OptionsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'eval-app', loadChildren: './pages/eval-app/eval-app.module#EvalAppPageModule' },
  { path: 'apps', loadChildren: './pages/apps/apps.module#AppsPageModule' },
  { path: 'login', loadChildren: './pages/home/login/login.module#LogInPageModule' },
  { path: 'register', loadChildren: './pages/home/register/register.module#RegisterPageModule' },
  { path: 'evaluate', loadChildren: './pages/home/evaluate/evaluate.module#EvaluatePageModule' },
  { path: 'app-config', loadChildren: './pages/app-config/app-config.module#AppConfigPageModule' },
  { path: 'my-evaluations', loadChildren: './pages/my-evaluations/my-evaluations.module#MyEvaluationsPageModule' },
  { path: 'eval-config', loadChildren: './pages/eval-config/eval-config.module#EvalConfigPageModule' },
  { path: 'statistics', loadChildren: './pages/eval-config/statistics/statistics.module#StatisticsPageModule' },
  { path: 'statistics', loadChildren: './pages/app-config/statistics/statistics.module#StatisticsPageModule' },
  { path: 'evaluation', loadChildren: './pages/eval-selection/evaluation/evaluation.module#EvaluationPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
