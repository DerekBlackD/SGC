import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';

import { HomeComponent } from './Management/Home/home.component';
import { GeneralManagementComponent } from './Process/GeneralManagement/general.component';
import { ResultCodeManagementComponent } from './Management/ResultCode/resultcode.component';
import { ResultCodeNewComponent } from './Management/ResultCode/new/newresultcode.component';
import { ResultCodeDelCoponent } from './Management/ResultCode/delete/delresultcode.component';
import { ImportComponent } from './Management/Import/import.component';
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

// Services
import { CollectionService } from '../Services/collection.service';

import { CollectionRoutingModule } from './collection-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CollectionRoutingModule,
    ToastyModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    GeneralManagementComponent,
    ResultCodeManagementComponent,
    ResultCodeNewComponent,
    ResultCodeDelCoponent,
    ImportComponent,
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
    ManagementComoponent
  ],
  entryComponents: [
    GenCustomerBagSearch
  ],
  providers: [CollectionService]
})
export class CollectionModule {}
