import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderBookComponent } from './order-book.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';

const routes: Routes = [
  {
      path     : 'order-book',
      component: OrderBookComponent
  }
];

@NgModule({
  imports     : [
      SharedModule,
      RouterModule.forChild(routes),
  ],
  declarations: [
    OrderBookComponent
  ]
})

export class OrderBookModule { }