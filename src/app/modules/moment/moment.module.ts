import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MomentRoutingModule } from './moment-routing.module';
import { MomentListComponent } from './moment-list/moment-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MomentListComponent],
  imports: [
    CommonModule,
    MomentRoutingModule,
    CommonModule,
    MaterialModule,
    SharedModule
  ]
})
export class MomentModule { }
