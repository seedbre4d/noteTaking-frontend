import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NoteService } from '../service/note.service';
import { NoteModel } from '../model/note.model';
import { NoteListComponent } from '../note-list/note-list.component';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CategoryModel } from '../../category/model/category.model';
import { CategoryService } from '../../category/service/category.service';
import { isNullOrUndefined } from 'util';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.less']
})
export class NoteAddComponent implements OnInit {
  @Input() note: NoteModel = new NoteModel();
  categories: CategoryModel[];
  selectedCategory: CategoryModel = new CategoryModel();
  onAdd = new EventEmitter();
  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<NoteListComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  addNote() {
    this.note.categoryId = this.selectedCategory.id;
    this.note.userId = +Cookie.get('id');
    const date = new Date(this.note.created);
    this.note.created = date;
    this.noteService.post(this.note).subscribe(res => {
      this.onAdd.emit();
      this.openSnackbar();
      this.note = new NoteModel();
    });
  }

  getCategories() {
    this.categoryService.get().subscribe(res => {
      this.categories = res;
    });
  }

  openSnackbar() {
    this.snackBar.open(`Added note "${this.note.title}"`, 'Ok', {
      duration: 5000
    });
  }
}
