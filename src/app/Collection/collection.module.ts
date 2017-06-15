import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { HomeComponent }   from './Management/Home/home.component';
import { GeneralManagementComponent } from './Process/GeneralManagement/general.component';

import { CollectionRoutingModule }  from './collection-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CollectionRoutingModule
  ],
  declarations: [
    HomeComponent,
    GeneralManagementComponent
  ],
  providers: []
})
export class CollectionModule {}