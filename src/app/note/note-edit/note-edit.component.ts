import { Component, OnInit, EventEmitter, Input, Inject } from '@angular/core';
import { NoteModel } from '../model/note.model';
import { NoteService } from '../service/note.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { NoteListComponent } from '../note-list/note-list.component';
import { CategoryModel } from '../../category/model/category.model';
import { CategoryService } from '../../category/service/category.service';
import { AfterContentInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.less']
})
export class NoteEditComponent implements OnInit {
  onEdit = new EventEmitter();
  categories: CategoryModel[];
  selectedCategory: CategoryModel = new CategoryModel();
  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<NoteListComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public note: NoteModel
  ) {
  }

  ngOnInit() {
    this.getCategories();
  }


  getCategories() {
    this.categoryService.get().subscribe(res => {
      this.categories = res;
      this.selectedCategory = this.categories.find(
        c => c.id === this.note.categoryId
      );
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateNote() {
    if (!isNullOrUndefined(this.selectedCategory.id)) {
      this.note.categoryId = this.selectedCategory.id;
    }
    if (!isNullOrUndefined(this.note.created)) {
      const date = new Date(this.note.created);
      this.note.created = date;
    }
    this.noteService.put(this.note.id, this.note).subscribe(res => {
      console.log(this.note);
      this.onEdit.emit();
      this.openSnackbar();
    });
  }

  openSnackbar() {
    this.snackBar.open(`Updated note!`, 'Ok', {
      duration: 5000
    });
  }
}
