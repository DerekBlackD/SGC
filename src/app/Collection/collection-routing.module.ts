import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Management/Home/home.component';
import { GeneralManagementComponent } from './Process/GeneralManagement/general.component'
import { ResultCodeManagementComponent } from './Management/ResultCode/resultcode.component'
import { ResultCodeNewComponent } from './Management/ResultCode/new/newresultcode.component'
import { ResultCodeDelCoponent } from './Management/ResultCode/delete/delresultcode.component'
import { ImportComponent } from './Management/Import/import.component'
import { MantenimientoUsuarioComponent } from './Seguridad/MantenimientoUsuario.component';
import { MantenimientoPerfilComponent } from './Seguridad/MantenimientoPerfil.component';
import { ConsultaUsuarioComponent } from './Seguridad/ConsultaUsuario.component';
import { ConsultaPerfilComponent } from './Seguridad/ConsultaPerfil.component';
import { ManagementGeneralComponent } from './Management/Report/Management/ManagementGeneral.component';
import { AccountComponent } from './Management/Format/Account/Account.component';
import { ManagementComoponent } from './Management/Format/Account/Management/Management.component';
import { FormatComponent} from './Management/Report/ManagementFormat/Format.component';
import { AccountDeleteComoponent } from './Management/Format/Account/Delete/AccountDelete.component';
import { AccountView } from './Management/Format/Account/View/AccountView.component';
import { SearchComponent } from './Management/Agent/search.component';
import { AgentManagementComponent } from './Management/Agent/Management/management.component';
import { AgentDeleteComponent } from './Management/Agent/Delete/delete.component';
import { CustomerSearch } from './Management/Customer/CustomerSearch.component';
import { CustomerManagementComponent } from './Management/Customer/Management/CustomerManagement.component';
import { CustomerDeleteComponent } from './Management/Customer/Delete/CustomerDelete.component';
import { BagSearchComponent } from './Management/Bag/BagSearch.component';
import { BagManagementComponent } from './Management/Bag/Management/BagManagement.component';
import { BagDeleteComponent } from './Management/Bag/Delete/BagDelete.component';
import { FilterSearchComponent } from './Management/Filter/FilterSearch.component';
import { FilterManagementComponent } from './Management/Filter/Management/FilterManagement.component';
import { FilterDeleteComponent } from './Management/Filter/Delete/FilterDelete.component';
import { QueryDynamicComponent } from './Report/QueryDynamic/QueryDynamic.component';
import { ReportDynamicComponent } from './Report/QueryDynamic/ReportDynamic/ReportDynamic.component';

const collectionRoutes: Routes = [
  { path: 'Cobranza/Home', component: HomeComponent },
  { path: 'Cobranza/GestionGeneral', component: GeneralManagementComponent },
  { path: 'Cobranza/GestionGeneral/:ID/:CustomerID/:BagID', component: GeneralManagementComponent },
  { path: 'Cobranza/ResultadoGestion', component: ResultCodeManagementComponent },
  { path: 'NuevoRS/:id', component: ResultCodeNewComponent},
  { path: 'DeleteRS/:id', component: ResultCodeDelCoponent},
  { path: 'Collection/GeneralImportation', component: ImportComponent},
  { path: 'Seguridad/MantenimientoUsuario', component: MantenimientoUsuarioComponent },
  { path: 'Seguridad/MantenimientoPerfil', component: MantenimientoPerfilComponent },
  { path: 'Seguridad/ConsultaUsuario/:id', component: ConsultaUsuarioComponent },
  { path: 'Seguridad/ConsultaPerfil/:id', component: ConsultaPerfilComponent },
  { path: 'Collection/ManagementGeneral', component:ManagementGeneralComponent },
  { path: 'Collection/FormatAccount', component:AccountComponent },
  { path: 'ManagementAccountFormat/:id', component: ManagementComoponent },
  { path: 'Collection/Format', component:FormatComponent },
  { path: 'AccountDelete/:id', component:AccountDeleteComoponent },
  { path: 'AccountView/:id', component: AccountView },
  { path: 'AgentSearch', component: SearchComponent },
  { path: 'AgentManagementComponent/:id', component: AgentManagementComponent },
  { path: 'AgentDeleteComponent/:id', component: AgentDeleteComponent },
  { path: 'CustomerSearch', component: CustomerSearch },
  { path: 'CustomerManagementComponent/:id', component: CustomerManagementComponent },
  { path: 'CustomerDeleteComponent/:id', component: CustomerDeleteComponent },
  { path: 'BagSearchComponent', component: BagSearchComponent },
  { path: 'BagManagementComponent/:id', component: BagManagementComponent },
  { path: 'BagDeleteComponent', component: BagDeleteComponent },
  { path: 'FilterSearchComponent', component: FilterSearchComponent },
  { path: 'FilterManagementComponent/:id', component: FilterManagementComponent },
  { path: 'FilterDeleteComponent/:id', component: FilterDeleteComponent },
  { path: 'QueryDynamicComponent', component: QueryDynamicComponent } ,
  { path: 'ReportDynamicComponent/:id/:des', component:ReportDynamicComponent }

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
