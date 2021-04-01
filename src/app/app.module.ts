import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material design
import {MatToolbarModule} from '@angular/material/toolbar';
import {MaterialDesign} from './material/material';
import { ForgotComponent } from './auth/forgot/forgot.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MaterialDesign
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
