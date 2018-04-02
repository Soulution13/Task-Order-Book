import { NgModule } from '@angular/core';
import { BalanceComponent } from './balance.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';


const routes: Routes = [
  {
      path     : 'balance',
      component: BalanceComponent
  }
];

@NgModule({
  imports     : [
      SharedModule,
      RouterModule.forChild(routes),
  ],
  declarations: [
    BalanceComponent
  ]
})

export class BalanceModule { }