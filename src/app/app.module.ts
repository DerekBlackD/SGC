import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { SecurityModule } from './Security/Security.module';
import { BannerComponent } from './Security/Banner/banner.component';
import { MenuComponent } from './Security/Menu/menu.component';
import { LoginComponent } from './Security/Login/login.component';
import { SelectProfileComponent } from './Security/Profile/SelectProfile.component';
import { AppRoutingModule } from './app-routing.module';

//Services
import { AuthenticationService } from './Services/authentication.service';

import { AppComponent } from './app.component';

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
    //SecurityModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
