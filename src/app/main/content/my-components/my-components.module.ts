import { WelcomeComponent } from './welcome/welcome.component';
import { BalanceModule } from './balance/balance.module';
import { NgModule } from '@angular/core';
import { ExchangesModule } from './exchanges/exchanges.module';
import { OrderBookModule } from './order-book/order-book.module';
import { ExchangeModule } from './exchange/exchange.module';
import { WelcomeModule } from './welcome/welcome.module';



@NgModule({
  imports: [
      ExchangesModule,
      ExchangeModule,
      OrderBookModule,
      BalanceModule,
      WelcomeModule
  ]
})

export class MyComponentsModule { }