import { Component, OnInit, EventEmitter, Input, Inject } from '@angular/core';
import { CategoryModel } from '../model/category.model';
import { CategoryService } from '../service/category.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryListComponent } from '../category-list/category-list.component';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.less']
})
export class CategoryEditComponent implements OnInit {
  onEdit = new EventEmitter();
  constructor(
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryListComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public category: CategoryModel
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  updateCategory() {
    this.categoryService.put(this.category.id, this.category).subscribe(res => {
      console.log(this.category);
      this.onEdit.emit();
      this.openSnackbar();
    });
  }

  openSnackbar() {
    this.snackBar.open(`Updated category "${this.category.name}"`, 'Ok', {
      duration: 5000
    });
  }
}
