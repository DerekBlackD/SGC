import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { HomeComponent }   from './Management/Home/home.component';

import { CollectionRoutingModule }  from './collection-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CollectionRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: []
})
export class CollectionModule {}