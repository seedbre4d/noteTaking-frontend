import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NoteModel } from '../model/note.model';
import { ApiService } from '../../service/api.service';

@Injectable()
export class NoteService extends ApiService<NoteModel>  {

  constructor(http: Http) {
    super(http);
    this.path = 'note';
 }

}
