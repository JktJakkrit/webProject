import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
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

}
