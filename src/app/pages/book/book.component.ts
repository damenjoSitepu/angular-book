import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/api/book.service';
import { catchError, throwError, finalize, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/skeleton-loader/list/list.component';
import { RouterModule } from '@angular/router';
import { AlertService } from '../../services/utils/alert.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    ListComponent,
    RouterModule,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit, OnDestroy {
  protected books: Book[] = [];
  protected isLoading: boolean = false;
  protected isDeletingBook: number = 0;
  private getBookSubscription$: Subscription | null = null;
  private deleteBookSubscription$: Subscription | null = null;

  constructor(
    private bookService: BookService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this._setup();
  }

  ngOnDestroy(): void {
    this.getBookSubscription$?.unsubscribe();
    this.deleteBookSubscription$?.unsubscribe();
  }

  private _setup(): void {
    this.isLoading = true;
    this._getBooks();
  }

  private _getBooks(): void {
    this.getBookSubscription$ = this.bookService.get().pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe((response) => {
      this.books = response.data.books;
    });
  }

  protected deleteBook(id: number): void {
    this.isDeletingBook = id;
    this.deleteBookSubscription$ = this.bookService.delete(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this.alertService.show({
          title: 'Error',
          description: error.error.message,
        });
        return throwError(() => error);
      }),
      finalize(() => {
        this.isDeletingBook = 0;
      })
    ).subscribe(() => {
      this._getBooks();
      this.alertService.show({
        title: 'Success',
        description: 'Book deleted successfully.',
      });
    });
  }
}
