import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CategoryModel } from '../model/category.model';
import { ApiService } from '../../service/api.service';

@Injectable()
export class CategoryService extends ApiService<CategoryModel>  {

  constructor(http: Http) {
    super(http);
    this.path = 'category';
 }

}
