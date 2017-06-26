import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './Management/Home/home.component';
import { GeneralManagementComponent } from './Process/GeneralManagement/general.component'
import { ResultCodeManagementComponent } from './Management/ResultCode/resultcode.component'
import { ResultCodeNewComponent } from './Management/ResultCode/new/newresultcode.component'


const collectionRoutes: Routes = [
  { path: 'Cobranza/Home', component: HomeComponent },
  { path: 'Cobranza/GestionGeneral', component: GeneralManagementComponent },
  { path: 'Cobranza/ResultadoGestion', component: ResultCodeManagementComponent },
  { path: 'Cobranza/ResultadoGestion/Nuevo', component: ResultCodeNewComponent }

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
