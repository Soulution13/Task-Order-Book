import { TradingPair } from "./../../../../_models/TradingPair";
import { BistrampService } from "./../../../../_services/bistramp.service";
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

@Component({
  selector: "app-exchanges",
  templateUrl: "./exchanges.component.html",
  styleUrls: ["./exchanges.component.scss"],
  animations: fuseAnimations
})
export class ExchangesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("filter") filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: TradingPairsDataSource | null;
  displayedColumns = ["name", "url_symbol", "description"];

  constructor(private bitstampService: BistrampService) {}

  ngOnInit() {
      this.dataSource = new TradingPairsDataSource(
      this.bitstampService,
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
}

export class TradingPairsDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject("");
  _filteredDataChange = new BehaviorSubject("");

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: TradingPair[] = [];
  renderedData: TradingPair[] = [];

  constructor(
    private bitstampService: BistrampService,
    private _paginator: MatPaginator,
    private _sort: MatSort
  ) {
    super();
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  connect(): Observable<TradingPair[]> {
    const displayDataChanges = [
      this.bitstampService.traidingPairs,
      this._paginator.page,
      this._filterChange,
      this._sort.sortChange
    ];

    this.bitstampService.tradingPairsToBehaviorSubject();

    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this.bitstampService.data
        .slice()
        .filter((tradingPair: TradingPair) => {
          const searchStr = (
            tradingPair.name +
            tradingPair.description +
            tradingPair.url_symbol
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

  sortData(data: TradingPair[]): TradingPair[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      switch (this._sort.active) {
        case "name":
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case "url_symbol":
          [propertyA, propertyB] = [a.url_symbol, b.url_symbol];
          break;
        case "description":
          [propertyA, propertyB] = [a.description, b.description];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }

  disconnect() {}
}
