import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanzamientoRoutingModule } from './lanzamiento-routing.module';
import { LanzamientoComponent } from './lanzamiento.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LanzamientoComponent],
  imports: [
    CommonModule,
    LanzamientoRoutingModule,
    NgxCurrencyModule,
    ReactiveFormsModule
  ]
})
export class LanzamientoModule { }
