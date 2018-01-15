import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService<TEntity> {

  path: string;

  constructor(private http: Http) { }

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  get(params: URLSearchParams = new URLSearchParams()): Observable<TEntity[]> {
    return this.http.get(`${environment.api_url}${this.path}/`, { headers: this.setHeaders(), search: params })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }


  put(id: number, body: Object = {}): Observable<TEntity> {
    return this.http.put(
      `${environment.api_url}${this.path}/${id}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  post(body: Object = {}): Observable<TEntity> {
    return this.http.post(
      `${environment.api_url}${this.path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  delete(id: number): Observable<TEntity> {
    return this.http.delete(
      `${environment.api_url}${this.path}/${id}`,
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

}
