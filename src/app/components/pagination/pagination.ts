import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  page = input.required<number>();
  pageSize = input.required<number>();
  total = input.required<number>();

  pageChange = output<number>();

  get pages(): number[] {
    const maxVisible = 5;
    const start = Math.max(this.page() - 2, 1);
    const end = Math.min(start + maxVisible - 1, this.total());

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  goTo(page: number) {
    if (page < 1 || page > this.total()) return;
    this.pageChange.emit(page);
  }

  next() {
    this.goTo(this.page() + 1);
  }

  prev() {
    this.goTo(this.page() - 1);
  }
}
