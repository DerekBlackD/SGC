import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BannerComponent } from './Security/Banner/banner.component';
import { MenuComponent } from './Security/Menu/menu.component';
import { LoginComponent } from './Security/Login/login.component';
import { SelectProfileComponent } from './Security/Profile/SelectProfile.component';

const SecurityRoutes: Routes = [
  { path: 'ElegirPerfil', component: SelectProfileComponent},
  { path: '', component: LoginComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(SecurityRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }