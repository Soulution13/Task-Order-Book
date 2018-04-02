import { Balance } from './../_models/Balance';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BalanceService {

    balances: BehaviorSubject<Balance[]> = new BehaviorSubject<Balance[]>([]);

    private balance : { [key:string]:number; } = {
        'LTC': 55,
        'ETH': 1020,
        'XRP': 99,
        'BCH': 176,
        'BTC': 100,
        'EUR': 1509,
        'USD': 1708 
    };

    constructor() { 
        this.generateBalances();
    }

    private generateBalances() {
        let tmpArray: Balance[];
        tmpArray = [
            {name: 'LTC', amount: this.balance['LTC']},
            {name: 'ETH', amount: this.balance['ETH']},
            {name: 'XRP', amount: this.balance['XRP']},
            {name: 'BCH', amount: this.balance['BCH']},
            {name: 'BTC', amount: this.balance['BTC']},
            {name: 'EUR', amount: this.balance['EUR']},
            {name: 'USD', amount: this.balance['USD']},
        ];

        this.balances.next(tmpArray);
    }

    get data(): Balance[] {
        return this.balances.value;
    }

    public getBalance(valute: string) {
        return this.balance[valute];
    }

    public minusBalance(valute: string, amount: number) {
        if (this.balance[valute] - amount > 0)
        {
            this.balance[valute] -= amount;
            this.generateBalances();
            return true;
        } 
        return false;;
    }

    public plusBalance(valute: string, amount: number) {
        this.balance[valute] += amount;
        this.generateBalances();
    }
}