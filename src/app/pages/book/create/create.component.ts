import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Book } from '../../../models/book.model';
import { catchError, finalize, Subscription, throwError } from 'rxjs';
import { BookService } from '../../../services/api/book.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../services/utils/alert.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  protected isLoading: boolean = false;
  private createBookSubscription$: Subscription | null = null;
  protected book: Partial<Book> = {
    name: '',
    isbn: '',
    released_at: ''
  };

  constructor(
    private bookService: BookService,
    private router: Router,
    private _alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this._setup();
  }

  ngOnDestroy(): void {
    this.createBookSubscription$?.unsubscribe();
  }

  private _setup(): void {}

  protected createBook(): void {
    this.isLoading = true;
    this.createBookSubscription$ = this.bookService.create(this.book).pipe(
      catchError((error: HttpErrorResponse) => {
        this._alertService.show({
          title: 'Error',
          description: error.error.message,
        });
        return throwError(() => error);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe((_) => {
      this.router.navigate(['/book']);
    });
  }
}
