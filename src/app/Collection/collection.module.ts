import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './Management/Home/home.component';
import { GeneralManagementComponent } from './Process/GeneralManagement/general.component';
import { ResultCodeManagementComponent } from './Management/ResultCode/resultcode.component';
import { ResultCodeNewComponent } from './Management/ResultCode/new/newresultcode.component';
import { ResultCodeDelCoponent } from './Management/ResultCode/delete/delresultcode.component';
import { ImportComponent } from './Management/Import/import.component';
import { GenCustomerBag } from './Process/GeneralManagement/GenCustomerBag/gencustbag.component';
import { EditGenCustomerBag } from './Process/GeneralManagement/GenCustomerBag/editcustbag.component';
import { GenCustomerBagPhone } from './Process/GeneralManagement/GenCustomerBagPhone/genphone.component';
import { GenCustomerBagAccount } from './Process/GeneralManagement/GenCustomerBagAccount/genaccount.component';
import { GenManagementList } from './Process/GeneralManagement/GenManagementList/genmanagementlist.component';
import { GenManagement } from './Process/GeneralManagement/GenManagement/genmanagement.component';

//Services
import { CollectionService } from '../Services/collection.service';

import { CollectionRoutingModule }  from './collection-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CollectionRoutingModule
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
    GenCustomerBagPhone,
    GenCustomerBagAccount,
    GenManagementList,
    GenManagement
  ],
  providers: [CollectionService]
})
export class CollectionModule {}