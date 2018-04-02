import { BalanceService } from './balance.service';
import { HttpClient } from '@angular/common/http';
import { Order } from './../_models/Order';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';

@Injectable()
export class OrderBookService {
    private orderbookUrl = '/api/orderbook'

    private orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
    public currentOrders = this.orders.asObservable();

    constructor(
        private http: HttpClient,
        private balance: BalanceService
    ) 
    { 
        this.getOrders();
    }

    get data(): Order[] {
        return this.orders.value;
    }

    getOrders() {
        this.http.get(this.orderbookUrl).subscribe((data: Order[]) => {
            this.orders.next(data);
        })
    }

    addOrder(order: Order) {

        const marketFrom = order.market.substring(0,3); // SELL
        const marketTo = order.market.substring(4,7); // BUY


        if (! this.balance.minusBalance( order.type == 'SELL' ? marketFrom : marketTo, order.type == 'SELL' ? order.amount : order.price * order.amount )) {

            return new Observable(observer => {
                observer.error(new Error('Price it too high for your curent balance'));
                observer.complete();
            })
        }

        return new Observable( observer => {
            this.http.post(this.orderbookUrl, order).subscribe((data: Order) => {

            observer.next(true);
            observer.complete();
        }, error => {
            observer.error( new Error("Looks like you deleted all orders. Im-memmory api doesn't allow this functionality :)"));
            observer.complete();
        })
        });
    }

    removeOrder(id: number) {

        this.http.get(this.orderbookUrl + '/' + id).subscribe((order: Order) => {
            const marketFrom = order.market.substring(0,3); // SELL
            const marketTo = order.market.substring(4,7); // BUY

            this.balance.plusBalance( order.type == 'SELL' ? marketFrom : marketTo, order.type == 'SELL' ? order.amount : order.price * order.amount );
        });

        this.http.delete(this.orderbookUrl + '/' + id).subscribe(data => {
            this.getOrders();
        })
    }

}