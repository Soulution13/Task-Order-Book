import { NgModule } from '@angular/core';
import { ExchangeComponent } from './exchange.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';

const routes: Routes = [
  {
      path     : 'exchange/:pair',
      component: ExchangeComponent
  }
];

@NgModule({
  imports     : [
      SharedModule,
      RouterModule.forChild(routes),
  ],
  declarations: [
    ExchangeComponent
  ]
})

export class ExchangeModule { }