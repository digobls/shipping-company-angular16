import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultSimpleTableComponent } from './default-simple-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PhoneMaskPipe } from './pipes/phone-mask.pipe';
import { DocumentMaskPipe } from './pipes/document-mask.pipe';
import { ReadJsonPipe } from './pipes/read-json.pipe';
import {NgxPaginationModule} from "ngx-pagination";

describe('DefaultSimpleTableComponent', () => {
  let component: DefaultSimpleTableComponent;
  let fixture: ComponentFixture<DefaultSimpleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DefaultSimpleTableComponent,
        DocumentMaskPipe,
        PhoneMaskPipe,
        ReadJsonPipe,
      ],
      imports: [
        FormsModule,
        NgxPaginationModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSimpleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the loading skeleton when loadingList is true', () => {
    component.loadingList = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-skeleton-loading')).not.toBeNull();
  });

  it('should display table data when loadingList is false and listData is not empty', () => {
    component.loadingList = false;
    component.listData = [{ name: 'Test', value: 123 }];
    component.listHeader = [
      { key: 'name', label: 'Name', isVisible: true, sortable: false },
      { key: 'value', label: 'Value', isVisible: true, sortable: false }
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table')).not.toBeNull();
    expect(compiled.querySelector('thead')).not.toBeNull();
    expect(compiled.querySelector('tbody tr')).not.toBeNull();
  });

  it('should correctly handle sorting', () => {
    component.listHeader = [
      { key: 'name', label: 'Name', isVisible: true, sortable: true },
      { key: 'value', label: 'Value', isVisible: true, sortable: false }
    ];
    spyOn(component.changeListSort, 'emit');
    component.sort('name', true);
    expect(component.changeListSort.emit).toHaveBeenCalledWith({ order: 'asc', key: 'name' });
    component.sort('name', true);
    expect(component.changeListSort.emit).toHaveBeenCalledWith({ order: 'desc', key: 'name' });
  });

  it('should paginate correctly', () => {
    component.listData = Array.from({ length: 50 }, (_, i) => ({ name: `Item ${i + 1}`, value: i + 1 }));
    component.totalRecordsPerPage = 10;
    component.currentPage = 1;
    component.calculateTotalPages();
    component.calculatePagesToShow();
    expect(component.totalPages).toBe(5);
    expect(component.pagesToShow).toEqual([1, 2, 3, 4, 5]);
  });

  it('should change items per page correctly', () => {
    component.totalRecordsPerPage = 10;
    component.onChangeItemsPerPage(20);
    expect(component.totalRecordsPerPage).toBe(20);
    expect(component.currentPage).toBe(1);
  });
});
