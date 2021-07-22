import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url = environment.serverURL;
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  onRegister(
    username: string,
    password: string,
    name: string,
    email: string,
    address: string,
    city: string,
    phone: string,
    state: string,
    sub: string,
    zip: string,  ){
    let body = {
      username,
      password,
      name,
      email,
      address,
      city,
      phone,
      state,
      sub,
      zip,
    }
    
    return this.http
      .post<any>(this.url + '/register/post', body)
      .pipe(catchError(this.handleError));
    }


    //  getDataUser(regis_sys_id: string) {
    //   return this.http.get<any>(this.url + '/register/id/' + regis_sys_id, )
    // }
    
}
