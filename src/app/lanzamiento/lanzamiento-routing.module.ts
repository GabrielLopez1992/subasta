import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanzamientoComponent } from './lanzamiento.component';

const routes: Routes = [{ path: '', component: LanzamientoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanzamientoRoutingModule { }
