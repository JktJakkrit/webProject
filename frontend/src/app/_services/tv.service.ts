import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TvProduct } from '../models/tv.model';

@Injectable({
  providedIn: 'root'
})
export class TvService {
  private url = environment.serverURL;
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  
  
  getMasterTvs() {
    return this.http.get<TvProduct[]>(this.url + '/tv/all');
  }

  addMasterTv(
    type: string,
    code: string,
    name: string,
    brand: string,
    detail: string,
    price: string,
    amount: string,
    scsize: string,
    avatar: File
  ) {
    var isvoid = 0;
    // var amount = 1;
    // const token_head = this.getHeader()
    console.log(avatar);
    var f = new FormData();
    f.append('type', type);
    f.append('code', code);
    f.append('name', name);
    f.append('brand', brand);
    f.append('detail', detail);
    f.append('price', price);
    f.append('amount', amount);
    f.append('scsize', scsize);
    f.append('avatar', avatar, avatar.name);
    f.append('isvoid', isvoid.toFixed());
    f.forEach((v, k) => {
      console.log(k, ' :  ', v);
    });
    // return this.http.post<any>('http://localhost:3000/building/add-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    return this.http
      .post<any>(this.url + '/tv/post', f, {})
      .pipe(catchError(this.handleError));
  }

  updateMasterTv(
    tv_sys_id: string,
    type: string,
    code: string,
    name: string,
    brand: string,
    detail: string,
    price: string,
    amount: string,
    scsize: string,
    
    avatar: File,
    isvoid
  ) {
    const body = {
      type,
      code,
      name,
      brand,
      detail,
      price,
      amount,
      scsize,
      avatar,
      isvoid,
    };
    var f = new FormData();
    f.append('type', type);
    f.append('code', code);
    f.append('name', name);
    f.append('brand', brand);
    f.append('detail', detail);
    f.append('price', price);
    f.append('amount', amount);
    f.append('scsize', scsize);
    f.append('avatar', avatar, avatar.name);
    f.append('isvoid', isvoid);
    f.forEach((v, k) => {
      console.log(k, ' :  ', v);
    });
    // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    var REST_URL = this.url + '/tv/id/' + tv_sys_id;
    return this.http
      .put<any>(REST_URL, f)
      .pipe(catchError(this.handleError));
  }

  deleteTv(tv_sys_id: string) {
    var REST_URL = this.url + '/tv/id' + '/' + tv_sys_id;
    return this.http.delete<any>(REST_URL).pipe(catchError(this.handleError));
  }

}
