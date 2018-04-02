import { TradingPair } from './../_models/TradingPair';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BistrampService {
    private baseUrl = "https://www.bitstamp.net/api/v2/";

    traidingPairs: BehaviorSubject<TradingPair[]> = new BehaviorSubject<TradingPair[]>([]);

    constructor(
        private http: HttpClient
    ) 
    { 
    }

    get data(): TradingPair[] {
        return this.traidingPairs.value;
    }

    tradingPairsToBehaviorSubject() {
        this.getTradingPairs().subscribe(data => {
            this.traidingPairs.next(data);
        });
    }

    getTradingPairs() {
        return this.http.get<Array<TradingPair>>(this.baseUrl + 'trading-pairs-info/', {
            headers: new HttpHeaders().set('Content-type', 'application/json')
        });
    }

    getTicker(pair: string) {
        return this.http.get<any>(this.baseUrl + 'ticker/' + pair, {
            headers: new HttpHeaders().set('Content-type', 'application/json')
        });
    }
}