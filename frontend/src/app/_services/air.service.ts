import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AirProduct } from '../models/air.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AirService {
  private url = environment.serverURL;
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getMasterAirs() {
    return this.http.get<AirProduct[]>(this.url + '/air/all');
  }

  addMasterAirs(
    type: string,
    code: string,
    name: string,
    brand: string,
    btu: string,
    room: string,
    detail: string,
    price: string,
    amount: string,
    avatar: File
  ) {
    var isvoid = 0;
    console.log(avatar);
    var f = new FormData();
    f.append('type', type);
    f.append('code', code);
    f.append('name', name);
    f.append('brand', brand);
    f.append('btu', btu);
    f.append('room', room);
    f.append('detail', detail);
    f.append('price', price);
    f.append('amount', amount);
    f.append('avatar', avatar, avatar.name);
    f.append('isvoid', isvoid.toFixed());
    f.forEach((v, k) => {
      console.log(k, ' :  ', v);
    });

    return this.http
      .post<any>(this.url + '/air/post', f, {})
      .pipe(catchError(this.handleError));
  }

  updateMasterAirs(
    air_sys_id: string,
    type: string,
    code: string,
    name: string,
    brand: string,
    btu: string,
    room: string,
    detail: string,
    price: string,
    amount: string,
    avatar: File,
    isvoid
  ) {
    const body = {
      type,
      code,
      name,
      brand,
      btu,
      room,
      detail,
      price,
      amount,
      avatar,
      isvoid,
    };
    var f = new FormData();
    f.append('type', type);
    f.append('code', code);
    f.append('name', name);
    f.append('brand', brand);
    f.append('btu', btu);
    f.append('room', room);
    f.append('detail', detail);
    f.append('price', price);
    f.append('amount', amount);
    f.append('avatar', avatar, avatar.name);
    f.append('isvoid', isvoid);
    f.forEach((v, k) => {
      console.log(k, ' :  ', v);
    });
    // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    var REST_URL = this.url + '/air/id/' + air_sys_id;
    return this.http
      .put<any>(REST_URL, f)
      .pipe(catchError(this.handleError));
  }

  deleteAir(air_sys_id: string) {
    var REST_URL = this.url + '/air/id' + '/' + air_sys_id;
    return this.http.delete<any>(REST_URL).pipe(catchError(this.handleError));
  }


}
