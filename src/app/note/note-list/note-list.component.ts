import { Component, OnInit } from '@angular/core';
import { NoteService } from '../service/note.service';
import { NoteModel } from '../model/note.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NoteAddComponent } from '../note-add/note-add.component';
import { NoteEditComponent } from '../note-edit/note-edit.component';
import { CategoryService } from '../../category/service/category.service';
import { CategoryModel } from '../../category/model/category.model';
import { isNullOrUndefined } from 'util';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.less']
})
export class NoteListComponent implements OnInit {
  notes: NoteModel[];
  userId: number;
  categories: CategoryModel[];
  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.userId = +(Cookie.get('id'));
  }

  ngOnInit() {
    this.fetchAll();
  }

  getCategories() {
    this.categoryService.get().subscribe(res => {
      this.categories = res;
    });
  }
  fetchAll() {
    this.noteService.get().subscribe(res => {
      this.notes = res.filter(r => r.userId === this.userId);
      this.categoryService.get().subscribe(res2 => {
        this.categories = res2;
        for (const note of this.notes) {
          const category = this.categories.find(c => c.id === note.categoryId);
          if (category) {
            note.categoryName = category.name;
          }
        }
      });
    });
  }

  openEditDialog(note: NoteModel): void {
    const dialogRef = this.dialog.open(NoteEditComponent, {
      width: '60%',
      height: '60%',
      data: note
    });
    dialogRef.componentInstance.onEdit.subscribe(res => {
      this.fetchAll();
    });
    dialogRef.afterClosed().subscribe(res => {
      dialogRef.componentInstance.onEdit.unsubscribe();
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(NoteAddComponent, {
      width: '60%',
      height: '60%',
    });
    dialogRef.componentInstance.onAdd.subscribe(res => {
      this.fetchAll();
    });
    dialogRef.afterClosed().subscribe(res => {
      dialogRef.componentInstance.onAdd.unsubscribe();
    });
  }

  delete(note: NoteModel) {
    this.notes = this.notes.filter(c => c.id !== note.id);
    this.noteService.delete(note.id).subscribe(res => {
      console.log('success!');
      this.openSnackbar();
    });
  }
  openSnackbar() {
    this.snackBar.open(`Note deleted!`, 'Ok', {
      duration: 5000
    });
  }
}
