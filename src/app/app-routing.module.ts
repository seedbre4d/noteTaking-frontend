import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: './user/user.module#UserModule',
      },
      {
        path: 'note',
        loadChildren: './note/note.module#NoteModule',
        canActivateChild: [AuthGuard]
      },
      {
        path: 'category',
        loadChildren: './category/category.module#CategoryModule',
        canActivateChild: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
