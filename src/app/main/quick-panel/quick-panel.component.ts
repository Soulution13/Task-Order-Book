import { OrderBookService } from './../../_services/order-book.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../_models/Order';

@Component({
    selector     : 'fuse-quick-panel',
    templateUrl  : './quick-panel.component.html',
    styleUrls    : ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseQuickPanelComponent implements OnInit
{
    date: Date;

    constructor(
        private orderBookService: OrderBookService
    )
    {
        this.date = new Date();
    }

    ngOnInit()
    {
    }
}
