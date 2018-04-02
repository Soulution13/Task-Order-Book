import { BalanceService } from './../../../../_services/balance.service';
import { TradingPair } from './../../../../_models/TradingPair';
import { BistrampService } from './../../../../_services/bistramp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderBookService } from './../../../../_services/order-book.service';
import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { Order } from '../../../../_models/Order';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  animations : fuseAnimations
})
export class ExchangeComponent implements OnInit {

  orders: Order[];
  exchangeFrom = "EUR";
  exchangeTo = "BTC";

  buyPrice = 0;
  buyAmount = 0;
  sellPrice = 0;
  sellAmount = 0;

  balanceFrom: number;
  balanceTo: number;

  tradingPair: TradingPair;

  buyForm: FormGroup;
  buyFormErrors: any;
  sellForm: FormGroup;
  sellFormErrors: any;

  constructor(
    private orderBookService: OrderBookService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bitstampService: BistrampService,
    private router: Router,
    private balance: BalanceService,
    public snackBar: MatSnackBar
  ) 
  {
    this.buyFormErrors = {
      amount        : {},
      price         : {},
    };

    this.sellFormErrors = {
      amount        : {},
      price         : {},
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // console.log(params['pair']);

      this.bitstampService.getTradingPairs().subscribe(data => {
        this.tradingPair = data.find(x => x.url_symbol == params['pair']);
        this.exchangeFrom = this.tradingPair.name.substring(4,7);
        this.exchangeTo = this.tradingPair.name.substring(0,3);

        this.balanceFrom = this.balance.getBalance(this.exchangeFrom);
        this.balanceTo = this.balance.getBalance(this.exchangeTo);

      })

      this.bitstampService.getTicker(params['pair']).subscribe(data => {
        this.buyPrice = data.last;
        this.sellPrice = data.last;
      })
    });

    this.orderBookService.currentOrders.subscribe(orders => this.orders = orders);

    this.buyForm = this.createBuyForm();
    this.sellForm = this.createSellForm();

    this.buyForm.valueChanges.subscribe(() => {
      this.onBuyFormValuesChanged();
    });

    this.sellForm.valueChanges.subscribe(() => {
      this.onSellFormValuesChanged();
    });
  }

  onBuyFormValuesChanged() {
    for (const field in this.buyFormErrors) {
      if (!this.buyFormErrors.hasOwnProperty(field)) {
        continue;
      }

      this.buyFormErrors[field] = {};
      const control = this.buyForm.get(field);
      if (control && control.dirty && !control.valid) {
        this.buyFormErrors[field] = control.errors;
      }
    }
  }

  onSellFormValuesChanged() {
    for (const field in this.sellFormErrors) {
      if (!this.sellFormErrors.hasOwnProperty(field)) {
        continue;
      }

      this.sellFormErrors[field] = {};
      const control = this.sellForm.get(field);
      if (control && control.dirty && !control.valid) {
        this.sellFormErrors[field] = control.errors;
      }
    }
  }

  createBuyForm()
  {
      return this.formBuilder.group({
          amount        : ['', greaterThanZeroValidator],
          price         : ['', greaterThanZeroValidator],
      });
  }

  createSellForm()
  {
      return this.formBuilder.group({
          amount        : ['', greaterThanZeroValidator],
          price         : ['', greaterThanZeroValidator],
      });
  }

  buy() {
    if (this.buyForm.valid) {
      const order: Order = Object.assign({}, this.buyForm.value);
      order.type = "BUY";
      order.market = this.tradingPair.name;

      this.orderBookService.addOrder(order).subscribe(data => {

        console.log(data);

          this.snackBar.open('Order succesfuly added', 'OK', {
            verticalPosition: 'bottom',
            duration: 5000
          });
          this.router.navigate(['/my-components/order-book']);

      }, error => {
        
        console.log("Error");

        this.snackBar.open(error, 'OK', {
          verticalPosition: 'bottom',
          duration: 5000
        });

      });
    }
  }

  sell() {
    if (this.sellForm.valid) {
      const order:Order = Object.assign({}, this.sellForm.value);
      order.type = "SELL";
      order.market = this.tradingPair.name;

      this.orderBookService.addOrder(order).subscribe(data => {

        this.snackBar.open('Order succesfuly added', 'OK', {
          verticalPosition: 'bottom',
          duration: 5000
        });
        this.router.navigate(['/my-components/order-book']);

    }, error => {
      
      this.snackBar.open(error, 'OK', {
        verticalPosition: 'bottom',
        duration: 5000
      });

    });
    }
  }

}

function greaterThanZeroValidator(control: FormControl) {
  let value = control.value;
  
  if (value <= 0 && value != null)
  {
    return {notGreaterThanZero: {value: value}};
  }
    
  return null;
}