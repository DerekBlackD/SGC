import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';
import { MyDatePickerModule } from 'mydatepicker';
import { CalendarModule, DialogModule } from 'primeng/primeng';

import { HomeComponent } from './Management/Home/home.component';
import { GeneralManagementComponent } from './Process/GeneralManagement/general.component';
import { ResultCodeManagementComponent } from './Management/ResultCode/resultcode.component';
import { ResultCodeNewComponent } from './Management/ResultCode/new/newresultcode.component';
import { ResultCodeDelCoponent } from './Management/ResultCode/delete/delresultcode.component';
import { ImportComponent } from './Management/Import/import.component';
import { GenAlert } from './Process/GeneralManagement/GenAlert/genalert.component';
import { GenCustomerBag } from './Process/GeneralManagement/GenCustomerBag/gencustbag.component';
import { EditGenCustomerBag } from './Process/GeneralManagement/GenCustomerBag/editcustbag.component';
import { GenCustomerBagAddress } from './Process/GeneralManagement/GenCustomerBagAddress/genaddress.component';
import { GenCustomerBagPhone } from './Process/GeneralManagement/GenCustomerBagPhone/genphone.component';
import { GenCustomerBagAccount } from './Process/GeneralManagement/GenCustomerBagAccount/genaccount.component';
import { GenCustomerBagSearch } from './Process/GeneralManagement/GenCustomerBagSearch/gensearch.component';
import { GenManagementList } from './Process/GeneralManagement/GenManagementList/genmanagementlist.component';
import { GenManagement } from './Process/GeneralManagement/GenManagement/genmanagement.component';
import { MantenimientoUsuarioComponent } from './Seguridad/MantenimientoUsuario.component';
import { MantenimientoPerfilComponent } from './Seguridad/MantenimientoPerfil.component';
import { ConsultaUsuarioComponent  } from './Seguridad/ConsultaUsuario.component';
import { ConsultaPerfilComponent  } from './Seguridad/ConsultaPerfil.component';
import { ManagementGeneralComponent } from './Management/Report/Management/ManagementGeneral.component';
import { AccountComponent } from './Management/Format/Account/Account.component';
import { ContactComponent } from './Management/ResultCode/Contact/Contact.component';
import { RelationComponent } from './Management/ResultCode/Relation/Relation.component';
import { ManagementComoponent } from './Management/Format/Account/Management/Management.component';
import { FormatComponent } from './Management/Report/ManagementFormat/Format.component';
import { FilesComponent } from './Management/Report/Files/Files.component';
import { AccountDeleteComoponent } from './Management/Format/Account/Delete/AccountDelete.component';
import { AccountView } from './Management/Format/Account/View/AccountView.component';
import { SearchComponent } from './Management/Agent/search.component';
import { AgentManagementComponent } from './Management/Agent/Management/management.component';
import { UserSearchComponent } from './Seguridad/User/UserSearch.component';
import { AgentDeleteComponent } from './Management/Agent/Delete/delete.component';
import { CustomerSearch } from './Management/Customer/CustomerSearch.component';
import { CustomerManagementComponent } from './Management/Customer/Management/CustomerManagement.component';
import { CustomerDeleteComponent } from './Management/Customer/Delete/CustomerDelete.component';
import { BagSearchComponent } from './Management/Bag/BagSearch.component';
import { BagManagementComponent } from './Management/Bag/Management/BagManagement.component';
import { BagDeleteComponent } from './Management/Bag/Delete/BagDelete.component';
import { FilterSearchComponent } from './Management/Filter/FilterSearch.component';
import { FilterManagementComponent } from './Management/Filter/Management/FilterManagement.component';
import { FilterImportComponent } from './Management/Filter/FilterImport/FilterImport.component';
import { FilterDeleteComponent } from './Management/Filter/Delete/FilterDelete.component';
import { QueryDynamicComponent } from './Report/QueryDynamic/QueryDynamic.component';
import { ReportDynamicComponent } from './Report/QueryDynamic/ReportDynamic/ReportDynamic.component';
import { ProgressiveManagementComponent } from './Process/ProgressiveManagement/progressive.component';
import { GenProgressiveMngtComponent } from './Process/ProgressiveManagement/GenProgressive/genprogressivemngt.component';
// Services
import { CollectionService } from '../Services/collection.service';

import { CollectionRoutingModule } from './collection-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CollectionRoutingModule,
    ToastyModule.forRoot(),
    MyDatePickerModule,
    CalendarModule,
    DialogModule
  ],
  declarations: [
    HomeComponent,
    GeneralManagementComponent,
    ResultCodeManagementComponent,
    ResultCodeNewComponent,
    ResultCodeDelCoponent,
    ImportComponent,
    GenAlert,
    GenCustomerBag,
    EditGenCustomerBag,
    GenCustomerBagAddress,
    GenCustomerBagPhone,
    GenCustomerBagAccount,
    GenCustomerBagSearch,
    GenManagementList,
    GenManagement,
    MantenimientoUsuarioComponent,
    MantenimientoPerfilComponent,
    ConsultaUsuarioComponent,
    ConsultaPerfilComponent,
    ManagementGeneralComponent,
    AccountComponent,
    ContactComponent,
    RelationComponent,
    ManagementComoponent,
    FormatComponent,
    FilesComponent,
    AccountDeleteComoponent,
    AccountView,
    SearchComponent,
    AgentManagementComponent,
    UserSearchComponent,
    AgentDeleteComponent,
    CustomerSearch,CustomerManagementComponent,CustomerDeleteComponent,
    BagSearchComponent,BagManagementComponent,BagDeleteComponent
    ,FilterSearchComponent,FilterManagementComponent,FilterImportComponent,FilterDeleteComponent
    ,QueryDynamicComponent,ReportDynamicComponent
    ,CustomerSearch,
    CustomerManagementComponent,
    CustomerDeleteComponent,
    BagSearchComponent,
    BagManagementComponent,
    BagDeleteComponent,
    FilterSearchComponent,
    FilterManagementComponent,
    FilterImportComponent,
    FilterDeleteComponent,
    ProgressiveManagementComponent,
    GenProgressiveMngtComponent
  ],
  entryComponents: [
    GenCustomerBagSearch
  ],
  providers: [CollectionService]
})
export class CollectionModule {}
