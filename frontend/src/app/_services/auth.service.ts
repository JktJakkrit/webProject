import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.serverURL;

  constructor(private http: HttpClient,private userService: UserService) {}

  login(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password,
    };

    console.log(body);

    return this.http.post<any>(this.url + '/user_login/login', body).pipe(
      map((user) => {
        if (user) {
          delete user.regis_sys_id;
          delete user.password;
          delete user.isvoid;
          localStorage.setItem('currentUser', JSON.stringify(user));
          
          this.userService.changeDataUser(user);
        }
      }),
      catchError(this.handleError)
    );
    
  }

  isLogin(): boolean {
    const valueUser =  JSON.parse(localStorage.getItem('currentUser'));
    if (valueUser) {
      return true;
    }
    return false;
  }

  logOut() {
    localStorage.removeItem('currentUser');
  }

 

  adminLogin(username: string, password: string, status: string): Observable<any> {
    const body = {
      username: username,
      password: password,
      status: status,
    };

    console.log(body);

    return this.http.post<any>(this.url + '/admin_login/login', body).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('currentAdmin', JSON.stringify(user));
        }
      }),
      catchError(this.handleError)
    );
  
  }

  AdminIsLogin(): boolean {
    const valueAdmin =  JSON.parse(localStorage.getItem('currentAdmin'));
    if (valueAdmin) {
      return true;
    }
    return false;
  }

  AdminLogOut() {
    localStorage.removeItem('currentAdmin');
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
