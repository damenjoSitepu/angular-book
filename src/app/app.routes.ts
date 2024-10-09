import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "book",
        title: "Book",
        loadChildren: () => import("./pages/book/book.module").then(m => m.BookModule),
    }
];
