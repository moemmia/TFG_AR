import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';


const routes: Routes = [
{
  path: '.',
  component: HomePage,
  children:
    [
      {
        path: 'evaluate',
        children:
          [
            {
              path: '',
              loadChildren: './evaluate/evaluate.module#EvaluatePageModule'
            }
          ]
      },
      {
        path: 'login',
        children:
          [
            {
              path: '',
              loadChildren: './login/login.module#LogInPageModule'
            }
          ]
      },
      {
        path: 'register',
        children:
          [
            {
              path: '',
              loadChildren: './register/register.module#RegisterPageModule'
            }
          ]
      },
      {
        path: '',
        redirectTo: './evaluate',
        pathMatch: 'prefix'
      }
    ]
  },
  {
    path: '',
    redirectTo: './evaluate',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class HomeRoutingPage{}
