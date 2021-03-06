import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BlockUIModule } from 'ng-block-ui';
import { ToastyModule } from 'ng2-toasty';
import { MyDatePickerModule } from 'mydatepicker';
import { CalendarModule, DialogModule } from 'primeng/primeng';

import { BannerComponent } from './Security/Banner/banner.component';
import { MenuComponent } from './Security/Menu/menu.component';
import { LoginComponent } from './Security/Login/login.component';
import { SelectProfileComponent } from './Security/Profile/SelectProfile.component';
import { NotificationComponent } from './Security/Notification/notification.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertComponent } from './Security/Notification/alert.component';

// Services
import { AuthGuard } from './Guards/auth.guard';
import { AuthenticationService } from './Services/authentication.service';
import { SecurityService } from './Services/security.service';

import { CollectionModule } from './Collection/collection.module';

import { AppComponent } from './app.component';

import { CollectionService } from './Services/collection.service';
import { UtilitesService } from './Services/utilities.service';


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    MenuComponent,
    LoginComponent,
    SelectProfileComponent,
    NotificationComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CollectionModule,
    AppRoutingModule,
    CommonModule,
    BlockUIModule,
    ToastyModule.forRoot(),
    MyDatePickerModule,
    CalendarModule,
    DialogModule,
    BootstrapModalModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    SecurityService,
    CollectionService,
    UtilitesService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
