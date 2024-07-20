import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../../store/app.store';
import { loadDeliveries } from '../../store/delivery.actions';
import {
  selectDeliveriesByDriver,
  selectDeliveriesByNeighborhood,
  selectFailedDeliveriesByDriver
} from '../../store/delivery.selectors';
import { TableHeader } from '../../shared/components/default-simple-table/table-header.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  listHeaderTable1: TableHeader[] = [];
  listHeaderTable2: TableHeader[] = [];
  listHeaderTable3: TableHeader[] = [];

  deliveriesByDriver$: Observable<{ name: string; total: number; completed: number; }[]> | undefined;
  failedDeliveriesByDriver$: Observable<{ name: string; count: number; }[]> | undefined;
  deliveriesByNeighborhood$: Observable<{ name: string; total: number; completed: number; }[]> | undefined;

  constructor(private store: Store<AppStore>) { }

  ngOnInit(): void {
    this.store.dispatch(loadDeliveries());

    this.loadTableHeaders();
    this.loadDataTable();
  }

  loadTableHeaders() {
    this.listHeaderTable1 = [
      { key: 'name', label: 'Nome do motorista', sortable: false },
      { key: 'total', label: 'Quantidade total de entregas', sortable: false },
      { key: 'completed', label: 'Quantidade de entregas realizadas', sortable: false }
    ];

    this.listHeaderTable2 = [
      { key: 'name', label: 'Nome do motorista', sortable: false },
      { key: 'count', label: 'Quantidade de entregas', sortable: false }
    ];

    this.listHeaderTable3 = [
      { key: 'name', label: 'Bairro', sortable: false },
      { key: 'total', label: 'Quantidade total de entregas', sortable: false },
      { key: 'completed', label: 'Quantidade de entregas Realizadas', sortable: false }
    ];
  }

  loadDataTable() {
    this.deliveriesByDriver$ = this.store.select(selectDeliveriesByDriver);
    this.failedDeliveriesByDriver$ = this.store.select(selectFailedDeliveriesByDriver);
    this.deliveriesByNeighborhood$ = this.store.select(selectDeliveriesByNeighborhood);
  }
}
