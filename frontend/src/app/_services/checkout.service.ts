import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
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
    sub: string,
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
      sub,
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

  upload(name: string, avatar: File) {
    const body = {
      name,
      avatar
    };
    var isvoid = 0;
    console.log('pic => ', avatar);

    var f = new FormData();
    f.append('name', name);
    f.append('avatar', avatar, avatar.name);
    f.append('isvoid', isvoid.toFixed());
    f.forEach((v, k) => {
      console.log(k, ' :  ', v);
    });
    return this.http
      .post<any>(this.url + "/bill/savepdf", f)
      .pipe(catchError(this.handleError));
  }
}
