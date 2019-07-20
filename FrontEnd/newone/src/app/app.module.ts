import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,Allroutes } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
//import { CreateuserComponent } from './createuser/createuser.component';
//import { UpdateuserComponent } from './updateuser/updateuser.component';
//import { DisaplyuserComponent } from './disaplyuser/disaplyuser.component';
//import { DeleteuserComponent } from './deleteuser/deleteuser.component';

@NgModule({
  declarations: [
    AppComponent,
    Allroutes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
