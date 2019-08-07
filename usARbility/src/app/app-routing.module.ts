import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'register', loadChildren: './home/tabs/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './home/tabs/login/login.module#LoginPageModule' },
  { path: 'evaluate', loadChildren: './home/tabs/evaluate/evaluate.module#EvaluatePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
