import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmountsService {
  private url = environment.serverURL;
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  
  
  getAmountAir() {
    return this.http.get<any>(this.url + '/amount/air');
  }
  getAmountFan() {
    return this.http.get<any>(this.url + '/amount/fan');
  }
  getAmountDish() {
    return this.http.get<any>(this.url + '/amount/dish');
  }
  getAmountRefri() {
    return this.http.get<any>(this.url + '/amount/refri');
  }
  getAmountTv() {
    return this.http.get<any>(this.url + '/amount/tv');
  }
  getAmountWash() {
    return this.http.get<any>(this.url + '/amount/wash');
  }
  getAmountOther() {
    return this.http.get<any>(this.url + '/amount/other');
  }
  
}
