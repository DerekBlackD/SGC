import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './Management/Home/home.component';
import { GeneralManagementComponent } from './Process/GeneralManagement/general.component'

const collectionRoutes: Routes = [
  { path: 'Cobranza/Home', component: HomeComponent },
  { path: 'Cobranza/GestionGeneral', component: GeneralManagementComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(collectionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CollectionRoutingModule { }
