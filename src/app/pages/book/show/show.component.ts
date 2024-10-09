import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Book } from '../../../models/book.model';
import { BookService } from '../../../services/api/book.service';
import { catchError, throwError, finalize, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../services/utils/alert.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent implements OnInit, OnDestroy {
  protected book: Book | null = null;
  protected isLoading: boolean = false;
  private getBookSubscription$: Subscription | null = null;
  private updateBookSubscription$: Subscription | null = null;

  constructor(
    private bookService: BookService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._setup();
  }

  ngOnDestroy(): void {
    this.getBookSubscription$?.unsubscribe();
    this.updateBookSubscription$?.unsubscribe();
  }

  private _setup(): void {
    this.isLoading = true;
    const bookId = this.route.snapshot.paramMap.get('id');
    this._getBookById(Number(bookId));
  }

  private _getBookById(id: number): void {
    this.getBookSubscription$ = this.bookService.getById(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this.alertService.show({
          title: 'Error',
          description: error.error.message,
        });
        return throwError(() => error);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe((response) => {
      this.book = response.data.book;
    });
  }

  protected updateBook(): void {
    if (!this.book) return;

    this.isLoading = true;
    this.updateBookSubscription$ = this.bookService.update(this.book.id, this.book).pipe(
      catchError((error: HttpErrorResponse) => {
        this.alertService.show({
          title: 'Error',
          description: error.error.message,
        });
        return throwError(() => error);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe((response) => {
      this.book = response.data.book;
      this.alertService.show({
        title: 'Success',
        description: response.message,
      });
    });
  }
}
