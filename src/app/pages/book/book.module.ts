import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './book-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BookRoutingModule
  ],
  exports: [
    BookRoutingModule
  ],
})
export class BookModule { }

