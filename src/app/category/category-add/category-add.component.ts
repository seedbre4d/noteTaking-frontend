import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { CategoryModel } from '../model/category.model';
import { CategoryListComponent } from '../category-list/category-list.component';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.less']
})
export class CategoryAddComponent implements OnInit {
  @Input() category: CategoryModel = new CategoryModel();
  onAdd = new EventEmitter();
  constructor(
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryListComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  addCategory() {
    this.category.userId = +Cookie.get('id');
    this.categoryService.post(this.category).subscribe(res => {
      console.log(this.category);
      this.onAdd.emit();
      this.openSnackbar();
      this.category = new CategoryModel();
    });
  }

  openSnackbar() {
    this.snackBar.open(`Added category "${this.category.name}"`, 'Ok', {
      duration: 5000
    });
  }
}
