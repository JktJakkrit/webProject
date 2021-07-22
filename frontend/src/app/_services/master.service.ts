// import { AirProduct } from './../models/air.model';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
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
  
  addCheckOut(
    name: string,
    email: string,
    address: string,
    city: string,
    phone: string,
    state: string,
    zip: string,
    card: string,
    number_card: string,
    expMonth: string,
    expYear: string,
    cvv: string
  ) {
    var isvoid = 0;

    const body = {
      name,
      email,
      address,
      city,
      phone,
      state,
      zip,
      card,
      number_card,
      expMonth,
      expYear,
      cvv,
      isvoid,
    };

    return this.http
      .post<any>(this.url + '/bill/post', body, {})
      .pipe(catchError(this.handleError));
  }


  loadCategory() {
    return this.http.get<any>(this.url + '/category/all')
  }

  loadProducts() {
    return this.http.get<any>(this.url + '/product/all')
  }

  loadGroup() {
    return this.http.get<any>(this.url + '/group/all').pipe(mergeMap((res: any)=>{
      return of(res);
    }));
  }

  getMasterProduct() {
    const newParams = new HttpParams();
    // .set('catagory_sys_id', categoty_sys_id)
    return this.http.get<any>(this.url + '/product/all').pipe(mergeMap((res: any)=>{
      return of(res);
    }));
  }

  loadProductById(product_sys_id) {
    return this.http.get<any>(this.url + '/product/id/' + product_sys_id).pipe(mergeMap((res: any)=>{
      return of(res);
    }));
  }

  loadGroupById(category_sys_id) {
    return this.http.get<any>(
      this.url + '/group/categoryId/' + category_sys_id
    ).pipe(mergeMap((res: any)=>{
      return of(res);
    }));
  }

  loadProductByGroupId(group_sys_id) {
    return this.http.get<any>(this.url + '/product/groupId/' + group_sys_id).pipe(mergeMap((res: any)=>{
      return of(res);
    }));
  }
  
  // --------------select find----------------
  
  getProvinces() {
    const newParams = new HttpParams();
    // .set('catagory_sys_id', categoty_sys_id)
    return this.http.get<any>(this.url + '/find/provinces').pipe(mergeMap((res: any)=>{
      return of(res);
    }));
  }

  getDistrict(value) {
    return this.http.post<any>(this.url + "/find/province", {
      id: value,
    }).pipe(mergeMap((res: any)=>{
      return of(res);
    }));
  }

  getSubdistrict(value) {
    return this.http.post<any>(this.url + "/find/district", {
      id: value,
    }).pipe(mergeMap((res: any)=>{
      return of(res);
    }));
  }

  getZipCode(value) {
    return this.http.post<any>(this.url + "/find/zipcode", {
      id: value,
    }).pipe(mergeMap((res: any)=>{
      return of(res);
    }));
  }
  
}
