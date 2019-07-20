import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateuserComponent } from './createuser/createuser.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { DisaplyuserComponent } from './disaplyuser/disaplyuser.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';

const routes: Routes = [
  {path:"",redirectTo:'/displayuser',pathMatch:'full'},
  {path:"createuser",component:CreateuserComponent},
  {path:"deleteuser",component:DeleteuserComponent},
  {path:"displayuser",component:DisaplyuserComponent},
  {path:"updateuser/:id",component:UpdateuserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const Allroutes=[CreateuserComponent,DeleteuserComponent,DisaplyuserComponent,UpdateuserComponent];
