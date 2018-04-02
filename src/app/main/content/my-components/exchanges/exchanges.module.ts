import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ExchangesComponent } from './exchanges.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';

const routes: Routes = [
  {
      path     : 'exchanges',
      component: ExchangesComponent
  }
];


@NgModule({
  imports     : [
      SharedModule,
      RouterModule.forChild(routes),
  ],
  declarations: [
    ExchangesComponent
  ]
})

export class ExchangesModule { }