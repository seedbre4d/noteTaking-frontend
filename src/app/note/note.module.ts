import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { NoteAddComponent } from './note-add/note-add.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { NoteService } from './service/note.service';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatChipsModule,
  MatDialogModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import { CategoryService } from '../category/service/category.service';

@NgModule({
  imports: [
    CommonModule,
    NoteRoutingModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [NoteService, CategoryService],
  declarations: [NoteAddComponent, NoteListComponent, NoteEditComponent]
})
export class NoteModule {}
