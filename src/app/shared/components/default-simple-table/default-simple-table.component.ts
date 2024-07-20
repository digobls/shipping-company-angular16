import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-default-simple-table',
  templateUrl: './default-simple-table.component.html',
  styleUrls: ['./default-simple-table.component.scss']
})
export class DefaultSimpleTableComponent implements OnInit, OnChanges {
  // On loading data
  @Input() loadingList: boolean = true;

  // Data header and items
  @Input() listHeader: any = [];
  @Input() listData: any = [];
  totalItems = 0;
  currentPage: number = 1;
  totalRecordsPerPage: number = 10;

  // Display check header item view
  @Input() showDisplay: boolean = true;

  // Pagination
  protected readonly Math = Math;
  @Input() paginationInfo: boolean = true;
  @Input() maxSize: number = 5;
  startTotalPages: number = 0;
  totalPages: number = 0;
  pagesToShow: number[] = [];

  // Items per page
  @Input() showChangeTotal: boolean = true;
  itemsPerPageOptions: number[] = [10, 20, 30, 40, 50, 60];

  // Events
  @Output() changeListSort:EventEmitter<{order: string, key: string}> = new EventEmitter<{order: string, key: string}>();

  constructor() { }

  ngOnChanges(changes: any): void {
    if (changes?.listData?.currentValue?.length) {
      this.loadingList = false;
      this.totalItems = changes.listData.currentValue.length;
      this.calculateTotalPages();
      this.calculatePagesToShow();
    }
  }

  ngOnInit() {
    this.calculateTotalPages();
    this.calculatePagesToShow();

    this.listHeader.forEach((value: any) => {
      value.isVisible = true;
    });
  }

  // Sort item from header
  sort(key: string, sortable = false) {
    if (sortable) {
      this.listHeader.forEach((v: any) => {
        if (v.key === key && v.sortable) {
          if (v.sortOrder === 'asc') {
            v.sortOrder = 'desc';
            this.changeListSort.emit({ order: v.sortOrder, key: key });
          } else {
            v.sortOrder = 'asc';
            this.changeListSort.emit({ order: v.sortOrder, key: key });
          }
        } else {
          v.sortOrder = null;
        }
      });
    }
  }

  // Start pagination
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      if (this.currentPage !== page) {
        this.currentPage = page;
        this.calculatePagesToShow();
      }
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.calculatePagesToShow();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.calculatePagesToShow();
    }
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.listData?.length/ this.totalRecordsPerPage);

    if (!this.startTotalPages) {
      this.startTotalPages = this.totalPages;
    }
  }

  calculatePagesToShow(): void {
    const maxSize = this.maxSize;
    const currentPage = this.currentPage;
    const totalPages =  this.totalPages;
    let startPage = Math.max(1, currentPage - Math.floor(maxSize / 2));
    let endPage = Math.min(totalPages, startPage + maxSize - 1);

    if (endPage - startPage + 1 < maxSize) {
      startPage = Math.max(1, endPage - maxSize + 1);
    }

    this.pagesToShow = Array.from({length: (endPage + 1) - startPage}, (_, i) => startPage + i);
  }

  onChangeItemsPerPage(value: number): void {
    this.currentPage = 1;
    this.totalRecordsPerPage = value;
    this.calculateTotalPages();
    this.calculatePagesToShow();
  }
}
