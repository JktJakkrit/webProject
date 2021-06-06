import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.serverURL; 
  
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    
    const body = {
      username,
      password
    };
    console.log(body);
    
    return this.http.post<any>( this.url + '/'+ 'admin_login/login', body).pipe(
      catchError(this.handleError)
    );
  }

  isLogin(): boolean {
    const token =  localStorage.getItem('token');
    if (token) {
      return true
    }
    return false;
  }

  checkProfile(): boolean {
    const token =  localStorage.getItem('token');
    // const access = token.canAccess
    var ispf :boolean;
    // access.forEach(function (value) {
    //   if (value.permissionname == 'Profile Only') {
    //     ispf = true;
    //   }
    // });
    if (ispf == true) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }


}
