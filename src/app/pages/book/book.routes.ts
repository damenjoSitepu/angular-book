import { Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { CreateComponent as CreateBookComponent } from './create/create.component';
import { ShowComponent as ShowBookComponent } from './show/show.component';

export const routes: Routes = [
    {
        path: '',
        component: BookComponent,
    },
    {
        path: 'create',
        component: CreateBookComponent,
    },
    {
        path: ':id',
        component: ShowBookComponent,
    },
];
