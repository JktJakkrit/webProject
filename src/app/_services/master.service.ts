import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

 private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getMasterAirs(){
  return this.http.get<any>('http://localhost:3000/products/airs');
  }

  addMasterAirs( type: string, code: string, name: string, brand: string, btu: string, room: string, detail: string, price: string, amount: string, file: string) {
    var isvoid = 0;
    // const token_head = this.getHeader()
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
      file,
      isvoid,
    };
    // return this.http.post<any>('http://localhost:3000/building/add-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    console.log(body);

    return this.http
      .post<any>('http://localhost:3000/products/add-air', body,
                    {
                      headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                    }
                )
      .pipe(catchError(this.handleError));
  }

  updateMasterAirs(air_sys_id: string, type: string, code: string, name: string, brand: string, btu: string, room: string, detail: string, price: string, amount: string, file: string,isvoid){
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
      file,
      isvoid,
    };
    // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    var REST_URL = 'http://localhost:3000/products/update-air' + '/' + air_sys_id;
    return this.http
      .put<any>(REST_URL, body)
      .pipe(catchError(this.handleError));
  }
  // ------------------------------------------------------------------------------------------------------------------------------------------

  getMasterDishs(){
    return this.http.get<any>('http://localhost:3000/products/dishs');
    }
  
    addMasterDishs( type: string, code: string, name: string, brand: string, detail: string, price: string, amount: string, file: string) {
      var isvoid = 0;
      // const token_head = this.getHeader()
      const body = {
        type,
        code,
        name,
        brand,
        detail,
        price,
        amount,
        file,
        isvoid,
      };
      // return this.http.post<any>('http://localhost:3000/building/add-building', body, { headers: token_head }).pipe(
      //   catchError(this.handleError)
      console.log(body);
  
      return this.http
        .post<any>('http://localhost:3000/products/add-dish', body)
        .pipe(catchError(this.handleError));
    }
  
    updateMasterDishs(dish_sys_id: string, type: string, code: string, name: string, brand: string, detail: string, price: string, amount: string, file: string,isvoid){
      const body = {
        type,
        code,
        name,
        brand,
        detail,
        price,
        amount,
        file,
        isvoid,
      };
      // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
      //   catchError(this.handleError)
      var REST_URL = 'http://localhost:3000/products/update-dish' + '/' + dish_sys_id;
      return this.http
        .put<any>(REST_URL, body)
        .pipe(catchError(this.handleError));
    }

    // ------------------------------------------------------------------------------------------------------------------------------------------

  getMasterFans(){
    return this.http.get<any>('http://localhost:3000/products/fans');
    }
  
    addMasterFan( type: string, code: string, name: string, brand: string, detail: string, price: string, amount: string, size: string, file: string) {
      var isvoid = 0;
      // const token_head = this.getHeader()
      const body = {
        type,
        code,
        name,
        brand,
        detail,
        price,
        amount,
        size,
        file,
        isvoid,
      };
      // return this.http.post<any>('http://localhost:3000/building/add-building', body, { headers: token_head }).pipe(
      //   catchError(this.handleError)
      console.log(body);
  
      return this.http
        .post<any>('http://localhost:3000/products/add-fan', body)
        .pipe(catchError(this.handleError));
    }
  
    updateMasterFan(fan_sys_id: string, type: string, code: string, name: string, brand: string, detail: string, price: string,  size: string, amount: string, file: string,isvoid){
      const body = {
        type,
        code,
        name,
        brand,
        detail,
        price,
        amount,
        size,
        file,
        isvoid,
      };
      // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
      //   catchError(this.handleError)
      var REST_URL = 'http://localhost:3000/products/update-fan' + '/' + fan_sys_id;
      return this.http
        .put<any>(REST_URL, body)
        .pipe(catchError(this.handleError));
    }

// ------------------------------------------------------------------------------------------------------------------------------------------

getMasterRefri(){
  return this.http.get<any>('http://localhost:3000/products/fans');
  }

  addMasterRefri( type: string, icode: string, name: string, brand: string, capa: string, detail: string, price: string, amount: string, size: string, file: string) {
    var isvoid = 0;
    // const token_head = this.getHeader()
    const body = {
      type,
      icode,
      name,
      brand,
      detail,
      capa,
      price,
      amount,
      size,
      file,
      isvoid,
    };
    // return this.http.post<any>('http://localhost:3000/building/add-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    console.log(body);

    return this.http
      .post<any>('http://localhost:3000/products/add-refri', body)
      .pipe(catchError(this.handleError));
  }

  updateMasterRefri(refri_sys_id: string, type: string, icode: string,  capa: string, name: string, brand: string, detail: string, price: string,  size: string, amount: string, file: string,isvoid){
    const body = {
      type,
      icode,
      name,
      brand,
      detail,
      price,
      capa,
      amount,
      size,
      file,
      isvoid,
    };
    // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    var REST_URL = 'http://localhost:3000/products/update-refri' + '/' + refri_sys_id;
    return this.http
      .put<any>(REST_URL, body)
      .pipe(catchError(this.handleError));
  }


  // ------------------------------------------------------------------------------------------------------------------------------------------

getMasterTvs(){
  return this.http.get<any>('http://localhost:3000/products/tvs');
  }

  addMasterTv( type: string, icode: string, name: string, brand: string,  detail: string, price: string, amount: string, scsize: string, file: string) {
    var isvoid = 0;
    // const token_head = this.getHeader()
    const body = {
      type,
      icode,
      name,
      brand,
      detail,
      price,
      amount,
      scsize,
      file,
      isvoid,
    };
    // return this.http.post<any>('http://localhost:3000/building/add-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    console.log(body);

    return this.http
      .post<any>('http://localhost:3000/products/add-tv', body)
      .pipe(catchError(this.handleError));
  }

  updateMasterTv(refri_sys_id: string, type: string, icode: string, name: string, brand: string, detail: string, price: string,  scsize: string, amount: string, file: string,isvoid){
    const body = {
      type,
      icode,
      name,
      brand,
      detail,
      price,
      amount,
      scsize,
      file,
      isvoid,
    };
    // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    var REST_URL = 'http://localhost:3000/products/update-tv' + '/' + refri_sys_id;
    return this.http
      .put<any>(REST_URL, body)
      .pipe(catchError(this.handleError));
  }

   // ------------------------------------------------------------------------------------------------------------------------------------------

getMasterWashings(){
  return this.http.get<any>('http://localhost:3000/products/washings');
  }

  addMasterWashings( type: string, icode: string, name: string, brand: string,  detail: string, price: string, amount: string, cap: string, file: string) {
    var isvoid = 0;
    // const token_head = this.getHeader()
    const body = {
      type,
      icode,
      name,
      brand,
      detail,
      price,
      amount,
      cap,
      file,
      isvoid,
    };
    // return this.http.post<any>('http://localhost:3000/building/add-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    console.log(body);

    return this.http
      .post<any>('http://localhost:3000/products/add-washing', body)
      .pipe(catchError(this.handleError));
  }

  updateMasterWash(wash_sys_id: string, type: string, icode: string, name: string, brand: string, detail: string, price: string,  cap: string, amount: string, file: string,isvoid){
    const body = {
      type,
      icode,
      name,
      brand,
      detail,
      price,
      amount,
      cap,
      file,
      isvoid,
    };
    // return this.http.post<any>('http://localhost:3000/building/update-building', body, { headers: token_head }).pipe(
    //   catchError(this.handleError)
    var REST_URL = 'http://localhost:3000/products/update-washing' + '/' + wash_sys_id;
    return this.http
      .put<any>(REST_URL, body)
      .pipe(catchError(this.handleError));
  }



}
