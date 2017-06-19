import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { HomeComponent }   from './Management/Home/home.component';
import { GeneralManagementComponent } from './Process/GeneralManagement/general.component';
import { GeneralCustomerDataComponent } from './Process/GeneralManagement/GeneralCustomerData/customerdata.component';
import { GeneralCustomerPhoneComponent } from './Process/GeneralManagement/GeneralPhoneData/customerphone.component';
import { ResultCodeManagementComponent } from './Management/ResultCode/resultcode.component'

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
    GeneralCustomerDataComponent,
    GeneralCustomerPhoneComponent,
    ResultCodeManagementComponent
  ],
  providers: [CollectionService]
})
export class CollectionModule {}