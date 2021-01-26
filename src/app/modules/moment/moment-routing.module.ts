import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MomentListComponent } from './moment-list/moment-list.component';

const routes: Routes = [
  {
    path: '',
    component: MomentListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MomentRoutingModule {}
