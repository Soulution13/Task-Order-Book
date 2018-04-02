import { OrderBookService } from './../../../../_services/order-book.service';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { MatPaginator, MatSort } from "@angular/material";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import { fuseAnimations } from "../../../../core/animations";
import { Order } from '../../../../_models/Order';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss'],
  animations: fuseAnimations
})
export class OrderBookComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("filter") filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: OrdersDataSource | null;
  displayedColumns = ["id", "type", "amount", "price", "market", "remove"];

  constructor(private orderBookService: OrderBookService) {}

  ngOnInit() {
    this.dataSource = new OrdersDataSource(
      this.orderBookService,
      this.paginator,
      this.sort
    );
    Observable.fromEvent(this.filter.nativeElement, "keyup")
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  remove(id: number) {
    this.orderBookService.removeOrder(id);
  }
}

export class OrdersDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject("");
  _filteredDataChange = new BehaviorSubject("");

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Order[] = [];
  renderedData: Order[] = [];

  constructor(
    private orderBookService: OrderBookService,
    private _paginator: MatPaginator,
    private _sort: MatSort
  ) {
    super();
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  connect(): Observable<Order[]> {
    const displayDataChanges = [
      this.orderBookService.currentOrders,
      this._paginator.page,
      this._filterChange,
      this._sort.sortChange
    ];

    this.orderBookService.getOrders();

    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this.orderBookService.data
        .slice()
        .filter((order: Order) => {
          const searchStr = (
            order.id + order.type + order.market + order.price + order.type + order.amount
          ).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

      const sortedData = this.sortData(this.filteredData.slice());

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(
        startIndex,
        this._paginator.pageSize
      );
      return this.renderedData;
    });
  }

  sortData(data: Order[]): Order[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }

  disconnect() {}
}
