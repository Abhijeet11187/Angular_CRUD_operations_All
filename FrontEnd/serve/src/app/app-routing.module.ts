import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
 
  {path:"delete",component:DeleteComponent},
  {path:"list",component:ListComponent},
  {path:"update",component:UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const AppRoutes=[DeleteComponent,ListComponent,UpdateComponent]