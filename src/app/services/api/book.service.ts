import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../types/api-response.type';
import { Book } from '../../models/book.model';
import { environment } from '../../../environments/environment';

interface GetResponse {
  books: Book[];
}

interface GetByIdResponse {
  book: Book;
}

interface UpdateResponse {
  book: Book;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  get(): Observable<ApiResponse<GetResponse>> {
    return this.http.get<ApiResponse<GetResponse>>(`${environment.apiUrl}/book`);
  }

  getById(id: number): Observable<ApiResponse<GetByIdResponse>> {
    return this.http.get<ApiResponse<GetByIdResponse>>(`${environment.apiUrl}/book/${id}`);
  }

  create(book: Partial<Book>): Observable<ApiResponse<Book>> {
    return this.http.post<ApiResponse<Book>>(`${environment.apiUrl}/book`, book);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${environment.apiUrl}/book/${id}`);
  }

  update(id: number, book: Partial<Book>): Observable<ApiResponse<UpdateResponse>> {
    return this.http.put<ApiResponse<UpdateResponse>>(`${environment.apiUrl}/book/${id}`, {
      ...book,
      released_at: book.formatted_released_at,
    });
  }
}
