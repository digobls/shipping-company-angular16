import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DeliveryListComponent } from './delivery-list.component';
import { AppStore } from '../../store/app.store';
import { loadDeliveries } from '../../store/delivery.actions';
import { Delivery } from '../../models/delivery.model';
import { SharedModule } from '../../shared/shared.module';

describe('DeliveryListComponent', () => {
  let component: DeliveryListComponent;
  let fixture: ComponentFixture<DeliveryListComponent>;
  let store: Store<AppStore>;

  const deliveriesMock: Delivery[] = [
    {
      id: '1',
      documento: '123456',
      motorista: { nome: 'Motorista 1' },
      cliente_origem: {
        nome: "Empresa GHI",
        endereco: "Avenida Ibirapuera, 890",
        bairro: "Jardins",
        cidade: "São Paulo"
      },
      cliente_destino: {
        nome: "Ana Clara",
        endereco: "Rua Vergueiro, 1234",
        bairro: "Liberdade",
        cidade: "São Paulo"
      },
      status_entrega: 'Entregue'
    },
    {
      id: '2',
      documento: '789012',
      motorista: { nome: 'Motorista 2' },
      cliente_origem: {
        nome: "Empresa GHI",
        endereco: "Avenida Ibirapuera, 890",
        bairro: "Jardins",
        cidade: "São Paulo"
      },
      cliente_destino: {
        nome: "Ana Clara",
        endereco: "Rua Vergueiro, 1234",
        bairro: "Liberdade",
        cidade: "São Paulo"
      },
      status_entrega: 'Pendente'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryListComponent],
      imports: [
        StoreModule.forRoot({}),
        ReactiveFormsModule,
        FormsModule,
        SharedModule
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            select: jasmine.createSpy().and.returnValue(of(deliveriesMock)),
            dispatch: jasmine.createSpy(),
            pipe: jasmine.createSpy().and.returnValue(of(deliveriesMock))
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(DeliveryListComponent);
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
    expect(component.listHeaderTable.length).toBeGreaterThan(0);
  });

  it('should load data table', () => {
    component.loadDataTable();
    component.filteredDeliveries$?.subscribe(deliveries => {
      expect(deliveries.length).toBe(2);
    });
    expect(component.listDrivers.length).toBe(2);
    expect(component.listStatus.length).toBe(2);
  });

  it('should filter data based on search form', () => {
    component.formSearch.patchValue({ driver: 'Motorista 1', status: 'Entregue' });
    component.searchData();
    component.filteredDeliveries$?.subscribe(deliveries => {
      expect(deliveries.length).toBe(1);
      expect(deliveries[0].motorista.nome).toBe('Motorista 1');
      expect(deliveries[0].status_entrega).toBe('Entregue');
    });
  });

  it('should update filteredDeliveries when form value changes', () => {
    spyOn(component, 'searchData').and.callThrough();
    component.formSearch.patchValue({ driver: 'Motorista 2' });
    expect(component.searchData).toHaveBeenCalled();
  });
});
