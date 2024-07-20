import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Delivery } from '../../models/delivery.model';
import { AppStore } from '../../store/app.store';
import { selectAllDeliveries } from '../../store/delivery.selectors';
import { loadDeliveries } from '../../store/delivery.actions';
import { map } from 'rxjs/operators';
import { TableHeader } from '../../shared/components/default-simple-table/table-header.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {
  listHeaderTable: TableHeader[] = [];

  deliveries$: Observable<Delivery[]>;
  filteredDeliveries$: Observable<Delivery[]> | undefined;

  formSearch: FormGroup = new FormGroup({
    driver: new FormControl(null),
    status: new FormControl(null)
  });

  listDrivers: any = [];
  listStatus: any = [];
  loadingDrivers: boolean = false;
  loadingStatus: boolean = false;
  loadingList: boolean = false;

  constructor(private store: Store<AppStore>) {
    this.store.dispatch(loadDeliveries());
    this.deliveries$ = this.store.pipe(select(selectAllDeliveries));
  }

  ngOnInit(): void {
    this.loadTableHeaders();
    this.loadDataTable();

    this.formSearch.valueChanges.subscribe(() => {
      this.searchData();
    });
  }

  loadTableHeaders() {
    this.listHeaderTable = [
      { key: 'id', label: 'ID', sortable: false },
      { key: 'documento', label: 'Documento', sortable: false },
      { key: 'motorista', label: 'Motorista', sortable: false, usePipe: true, isJson: true, jsonKey: 'nome' },
      { key: 'cliente_origem', label: 'Cliente Origem', sortable: false, usePipe: true ,isJson: true, jsonKey: 'nome' },
      { key: 'cliente_destino', label: 'Cliente Destino', sortable: false, usePipe: true ,isJson: true, jsonKey: 'nome' },
      { key: 'status_entrega', label: 'Status', sortable: false }
    ];
  }

  loadDataTable() {
    this.filteredDeliveries$ = this.deliveries$.pipe(map(deliveries => deliveries));
    this.deliveries$.subscribe(deliveries => {
      this.listDrivers = [...new Set(deliveries.map((delivery, index) => delivery.motorista.nome))];
      this.listStatus = [...new Set(deliveries.map((status, index) => status.status_entrega))];
    });
  }

  searchData(): void {
    this.loadingList = true;
    this.filteredDeliveries$ = this.deliveries$.pipe(
      map(deliveries => deliveries.filter(delivery => {
        const driverMatch = this.formSearch.get('driver')?.value ? delivery.motorista.nome === this.formSearch.get('driver')?.value : true;
        const statusMatch = this.formSearch.get('status')?.value ? delivery.status_entrega === this.formSearch.get('status')?.value : true;
        return driverMatch && statusMatch;
      }))
    );
    this.filteredDeliveries$.subscribe(() => this.loadingList = false);
  }
}
