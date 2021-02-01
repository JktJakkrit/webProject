import { AirProduct } from './../models/air.model';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
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
      .post<any>(this.url + '/air/post', f, {
      })
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
    // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    var REST_URL = this.url + '/air/id' + '/' + air_sys_id;
    return this.http
      .put<any>(REST_URL, body)
      .pipe(catchError(this.handleError));
  }
  // ------------------------------------------------------------------------------------------------------------------------------------------

  getMasterDishs() {
    return this.http.get<any>(this.url + '/dish/all');
  }

  addMasterDishs(
    type: string,
    code: string,
    name: string,
    brand: string,
    detail: string,
    price: string,
    amount: string,
    avatar: File
  ) {
    var isvoid = 0;
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
    f.append('avatar', avatar, avatar.name);
    f.append('isvoid', isvoid.toFixed());
    f.forEach((v, k) => {
      console.log(k, ' :  ', v);
    });
    // return this.http.post<any>('http://localhost:3000/building/add-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    return this.http
      .post<any>(this.url + '/dish/post', f, {
      })
      .pipe(catchError(this.handleError));
  }

  updateMasterDishs(
    dish_sys_id: string,
    type: string,
    code: string,
    name: string,
    brand: string,
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
      detail,
      price,
      amount,
      avatar,
      isvoid,
    };
    // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    var REST_URL =
      this.url + '/dish/id/' + dish_sys_id;
    return this.http
      .put<any>(REST_URL, body)
      .pipe(catchError(this.handleError));
  }

  // ------------------------------------------------------------------------------------------------------------------------------------------

  getMasterFans() {
    return this.http.get<any>(this.url + '/fan/all');
  }

  addMasterFan(
    type: string,
    code: string,
    name: string,
    brand: string,
    detail: string,
    price: string,
    amount: string,
    size: string,
    avatar: File
  ) {
    var isvoid = 0;
    
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
    f.append('size', size);
    f.append('avatar', avatar, avatar.name);
    f.append('isvoid', isvoid.toFixed());
    f.forEach((v, k) => {
      console.log(k, ' :  ', v);
    });
    // return this.http.post<any>('http://localhost:3000/building/add-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    return this.http
      .post<any>(this.url + '/fan/post', f, {
      })
      .pipe(catchError(this.handleError));
  }

  updateMasterFan(
    fan_sys_id: string,
    type: string,
    code: string,
    name: string,
    brand: string,
    detail: string,
    price: string,
    size: string,
    amount: string,
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
      size,
      avatar,
      isvoid,
    };
    // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    var REST_URL =
      this.url + '/fan/id/' + fan_sys_id;
    return this.http
      .put<any>(REST_URL, body)
      .pipe(catchError(this.handleError));
  }

  // ------------------------------------------------------------------------------------------------------------------------------------------

  getMasterRefri() {
    return this.http.get<any>(this.url + '/refri/all');
  }

  addMasterRefri(
    type: string,
    code: string,
    name: string,
    brand: string,
    capa: string,
    detail: string,
    amount: string,
    price: string,
    avatar: File
  ) {
    var isvoid = 0;
  
    // const token_head = this.getHeader()
    console.log(avatar);
    var f = new FormData();
    f.append('type', type);
    f.append('code', code);
    f.append('name', name);
    f.append('brand', brand);
    f.append('capa', capa);
    f.append('detail', detail);
    f.append('price', price);
    f.append('amount', amount);
    f.append('avatar', avatar, avatar.name);
    f.append('isvoid', isvoid.toFixed());
    f.forEach((v, k) => {
      console.log(k, ' :  ', v);
    });
    // return this.http.post<any>('http://localhost:3000/building/add-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    return this.http
      .post<any>(this.url + '/refri/post', f, {
      })
      .pipe(catchError(this.handleError));
  }

  updateMasterRefri(
    refri_sys_id: string,
    type: string,
    code: string,
    capa: string,
    name: string,
    brand: string,
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
      detail,
      price,
      capa,
      amount,
      avatar,
      isvoid,
    };
    // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    var REST_URL =
      this.url + '/refri/id' + refri_sys_id;
    return this.http
      .put<any>(REST_URL, body)
      .pipe(catchError(this.handleError));
  }

  // ------------------------------------------------------------------------------------------------------------------------------------------

  getMasterTvs() {
    return this.http.get<any>(this.url + '/tv/all');
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
      .post<any>(this.url + '/tv/post', f, {
      })
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
    scsize: string,
    amount: string,
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
    // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    var REST_URL =
      this.url + '/tv/id/' + tv_sys_id;
    return this.http
      .put<any>(REST_URL, body)
      .pipe(catchError(this.handleError));
  }

  // ------------------------------------------------------------------------------------------------------------------------------------------

  getMasterWashings() {
    return this.http.get<any>(this.url + '/wash/all');
  }

  addMasterWashings(
    type: string,
    code: string,
    name: string,
    brand: string,
    detail: string,
    price: string,
    amount: string,
    cap: string,
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
    f.append('cap', cap);
    f.append('avatar', avatar, avatar.name);
    f.append('isvoid', isvoid.toFixed());
    f.forEach((v, k) => {
      console.log(k, ' :  ', v);
    });
    // return this.http.post<any>('http://localhost:3000/building/add-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    return this.http
      .post<any>(this.url + '/wash/post', f, {
      })
      .pipe(catchError(this.handleError));
  }

  updateMasterWash(
    wash_sys_id: string,
    type: string,
    code: string,
    name: string,
    brand: string,
    detail: string,
    price: string,
    cap: string,
    amount: string,
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
      cap,
      avatar,
      isvoid,
    };
    // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    var REST_URL =
      this.url + '/wash/id/' + wash_sys_id;
    return this.http
      .put<any>(REST_URL, body)
      .pipe(catchError(this.handleError));
  }
}
