import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable()
export class FakeOrderBookApiService implements InMemoryDbService {
  createDb() {
    let orderBook = [
      {
        id: 1,
            type: "SELL",
            amount: 100,
            price: 25,
            market: "BTC/ETH"
      },
      {
        id: 2,
            type: "BUY",
            amount: 100,
            price: 15,
            market: "BTC/EUR"
      }
    ];
    
    return { orderbook: orderBook };
  }
}
