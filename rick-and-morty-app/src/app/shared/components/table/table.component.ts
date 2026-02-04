import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PageEvent = {
  first: number;
  rows: number;
  page: number;
};

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() value: any[] = [];
  @Input() loading: boolean = false;
  @Input() paginator: boolean = false;
  @Input() rows: number = 10;
  @Input() totalRecords: number = 0;
  @Input() lazy: boolean = false;
  @Input() rowsPerPageOptions: number[] = [10, 20, 50];
  @Input() tableStyle: any = {};
  @Input() styleClass: string = '';

  @Output() page = new EventEmitter<PageEvent>();

  @ContentChild('header', { read: TemplateRef }) headerTemplate!: TemplateRef<any>;
  @ContentChild('body', { read: TemplateRef }) bodyTemplate!: TemplateRef<any>;
  @ContentChild('emptymessage', { read: TemplateRef }) emptyTemplate!: TemplateRef<any>;

  currentPage = 0;
  currentRows = this.rows;

  ngOnInit(): void {
    this.currentRows = this.rows;
  }

  ngOnChanges(): void {
    this.currentRows = this.rows;
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.currentRows);
  }

  get first(): number {
    return this.currentPage * this.currentRows;
  }

  get displayedValue(): any[] {
    if (this.lazy) {
      return this.value;
    }
    const start = this.first;
    const end = start + this.currentRows;
    return this.value.slice(start, end);
  }

  get canGoPrevious(): boolean {
    return this.currentPage > 0;
  }

  get canGoNext(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  goToFirstPage(): void {
    if (this.currentPage !== 0) {
      this.changePage(0);
    }
  }

  goToPreviousPage(): void {
    if (this.canGoPrevious) {
      this.changePage(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.canGoNext) {
      this.changePage(this.currentPage + 1);
    }
  }

  goToLastPage(): void {
    const lastPage = this.totalPages - 1;
    if (this.currentPage !== lastPage) {
      this.changePage(lastPage);
    }
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    const event: PageEvent = {
      first: this.first,
      rows: this.currentRows,
      page: this.currentPage
    };
    this.page.emit(event);
  }

  changeRowsPerPage(newRows: number): void {
    this.currentRows = newRows;
    this.currentPage = 0;
    const event: PageEvent = {
      first: 0,
      rows: this.currentRows,
      page: 0
    };
    this.page.emit(event);
  }

  get paginatorText(): string {
    const start = this.first + 1;
    const end = Math.min(this.first + this.currentRows, this.totalRecords);
    return `${start} - ${end} de ${this.totalRecords}`;
  }
}