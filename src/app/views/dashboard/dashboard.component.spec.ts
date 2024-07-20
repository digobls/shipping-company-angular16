import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { AppStore } from '../../store/app.store';
import { loadDeliveries } from '../../store/delivery.actions';
import {
  selectDeliveriesByDriver,
  selectDeliveriesByNeighborhood,
  selectFailedDeliveriesByDriver
} from '../../store/delivery.selectors';
import { SharedModule } from '../../shared/shared.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: Store<AppStore>;

  const deliveriesByDriverMock = [
    { name: 'Motorista 1', total: 10, completed: 5 },
    { name: 'Motorista 2', total: 8, completed: 8 }
  ];

  const failedDeliveriesByDriverMock = [
    { name: 'Motorista 1', count: 2 },
    { name: 'Motorista 2', count: 1 }
  ];

  const deliveriesByNeighborhoodMock = [
    { name: 'Bairro 1', total: 12, completed: 10 },
    { name: 'Bairro 2', total: 6, completed: 4 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        StoreModule.forRoot({}),
        SharedModule
      ],
      providers: [
        { provide: Store, useValue: {
            select: (selector: any) => {
              if (selector === selectDeliveriesByDriver) {
                return of(deliveriesByDriverMock);
              }
              if (selector === selectFailedDeliveriesByDriver) {
                return of(failedDeliveriesByDriverMock);
              }
              if (selector === selectDeliveriesByNeighborhood) {
                return of(deliveriesByNeighborhoodMock);
              }
              return of([]);
            },
            dispatch: jasmine.createSpy()
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadDeliveries action on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadDeliveries());
  });

  it('should load table headers', () => {
    component.loadTableHeaders();
    expect(component.listHeaderTable1.length).toBeGreaterThan(0);
    expect(component.listHeaderTable2.length).toBeGreaterThan(0);
    expect(component.listHeaderTable3.length).toBeGreaterThan(0);
  });

  it('should load data table', () => {
    component.loadDataTable();
    component.deliveriesByDriver$?.subscribe(data => {
      expect(data).toEqual(deliveriesByDriverMock);
    });
    component.failedDeliveriesByDriver$?.subscribe(data => {
      expect(data).toEqual(failedDeliveriesByDriverMock);
    });
    component.deliveriesByNeighborhood$?.subscribe(data => {
      expect(data).toEqual(deliveriesByNeighborhoodMock);
    });
  });
});
