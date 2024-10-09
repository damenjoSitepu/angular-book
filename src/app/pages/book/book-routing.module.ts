import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes as bookRoutes } from './book.routes';

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
