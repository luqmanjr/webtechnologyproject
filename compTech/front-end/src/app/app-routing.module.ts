import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegFormComponent } from './pages/reg-form/reg-form.component';
import { MainLayoutComponent } from './cust-layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SendReqComponent } from './pages/send-req/send-req.component';
import { ViewReqComponent } from './pages/view-req/view-req.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'reg-form',
    component:RegFormComponent
  },
  {
    path:'main-layout',
    component:MainLayoutComponent,
    children:[
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'send-req',
        component:SendReqComponent
      },
      {
        path:'view-req',
        component:ViewReqComponent
      },
      {
        path:'settings',
        component:SettingsComponent
      },
    ]
  },
  {
    path:'login',
    component:LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
