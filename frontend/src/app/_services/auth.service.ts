import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataUser } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.serverURL;

  private currentUserSubject: BehaviorSubject<DataUser>;
  public currentUser: Observable<DataUser>;

  constructor(private http: HttpClient, private userService: UserService) {
    // testlogin to have token
    this.currentUserSubject = new BehaviorSubject<DataUser>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    // ---------------------------------------------------------------------
  }

  public get currentUserValue(): DataUser {
    return this.currentUserSubject.value;
  }

  // loginToToken(username: string, password: string) {
  //   const body = {
  //     username: username,
  //     password: password,
  //   };

  //   return this.http.post<any>(this.url + '/user_login/login', body).pipe(
  //     map((user) => {
  //       // store user details and jwt token in local storage to keep user logged in between page refreshes

  //       if (user) {
  //         delete user.regis_sys_id;
  //         delete user.password;
  //         delete user.isvoid;
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //       }

  //       return user;
  //     })
  //   );
  // }

  login(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password,
    };

    console.log(body);

    return this.http.post<any>(this.url + '/user_login/login', body).pipe(
      mergeMap((user: any) => {
        console.log('user', user);
        if (user) {
          delete user.regis_sys_id;
          delete user.password;
          // delete user.pname_in_thai,
          // delete user.dname_in_thai,
          // delete user.sname_in_thai,
          delete user.isvoid;
          localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          this.userService.changeDataUser(user);
          return of(user)
        }
      }),
      catchError(this.handleError)
    );
  }

  isLogin(): boolean {
    const valueUser = JSON.parse(localStorage.getItem('currentUser'));
    if (valueUser) {
      return true;
    }
    return false;
  }

  logOut() {
    localStorage.removeItem('currentUser');
  }

  adminLogin(
    username: string,
    password: string,
    status: string
  ): Observable<any> {
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
    const valueAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    if (valueAdmin) {
      return true;
    }
    return false;
  }

  AdminLogOut() {
    localStorage.removeItem('currentAdmin');
  }

  private handleError(error: HttpErrorResponse) {
    console.log('Error ' + error);
    return throwError(error);
  }
}
