import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    UpdateComponent,
    ListComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
