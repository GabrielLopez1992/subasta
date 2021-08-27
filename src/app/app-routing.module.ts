import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'principal', loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule) }, 
  { path: 'lanzamiento', loadChildren: () => import('./lanzamiento/lanzamiento.module').then(m => m.LanzamientoModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
