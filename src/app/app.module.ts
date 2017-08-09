import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BlockUIModule } from 'ng-block-ui';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { BannerComponent } from './Security/Banner/banner.component';
import { MenuComponent } from './Security/Menu/menu.component';
import { LoginComponent } from './Security/Login/login.component';
import { SelectProfileComponent } from './Security/Profile/SelectProfile.component';
import { AppRoutingModule } from './app-routing.module';

//Services
import { AuthGuard } from './Guards/auth.guard';
import { AuthenticationService } from './Services/authentication.service';
import { SecurityService } from './Services/security.service';

import { CollectionModule } from './Collection/collection.module';

import { AppComponent } from './app.component';

import { CollectionService } from './Services/collection.service';



@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    MenuComponent,
    LoginComponent,
    SelectProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CollectionModule,
    AppRoutingModule,
    CommonModule,
    MyDatePickerModule,
    NgxMyDatePickerModule,
    BlockUIModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    SecurityService,
    CollectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
