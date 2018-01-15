import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { CategoryModel } from '../model/category.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.less']
})
export class CategoryListComponent implements OnInit {
  categories: CategoryModel[];
  userId: number;

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.userId = +Cookie.get('id');
  }

  ngOnInit() {
    this.fetchAll();
  }

  fetchAll() {
    this.categoryService.get().subscribe(res => {
      this.categories = res.filter(r => r.userId === this.userId);
    });
  }

  openEditDialog(category: CategoryModel): void {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      width: '250px',
      height: '35%',
      data: category
    });
    dialogRef.componentInstance.onEdit.subscribe(res => {
      this.fetchAll();
    });
    dialogRef.afterClosed().subscribe(res => {
      dialogRef.componentInstance.onEdit.unsubscribe();
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CategoryAddComponent, {
      width: '250px',
      height: '35%',
    });
    dialogRef.componentInstance.onAdd.subscribe(res => {
      this.fetchAll();
    });
    dialogRef.afterClosed().subscribe(res => {
      dialogRef.componentInstance.onAdd.unsubscribe();
    });
  }

  delete(category: CategoryModel) {
    this.categories = this.categories.filter(c => c.id !== category.id);
    this.categoryService.delete(category.id).subscribe(res => {
      console.log('success!');
      this.openSnackbar();
    });
  }
  openSnackbar() {
    this.snackBar.open(`Category deleted!`, 'Ok', {
      duration: 5000
    });
  }
}
