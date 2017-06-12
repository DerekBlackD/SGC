import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';

import { BannerComponent } from './Security/Banner/banner.component';
import { MenuComponent } from './Security/Menu/menu.component';
import { LoginComponent } from './Security/Login/login.component';
import { SelectProfileComponent } from './Security/Profile/SelectProfile.component';

const SecurityRoutes: Routes = [
  { path: 'ElegirPerfil', component: SelectProfileComponent, canActivate: [AuthGuard]},
  { path: '', component: LoginComponent},
  { path: '**', redirectTo: '' }
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