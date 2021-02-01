import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/common-data.service';
import { AuthService } from 'src/app/_services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private authService: AuthService, private _commondata: CommonDataService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLogin()) {
      this.router.navigate(['login']);
    }
    setTimeout((_) => this._commondata.showLoader(false), 200);
  }

  isLogin = false;

  public onSubmit(form: any) {
    this.authService.login(form.username, form.password).subscribe(
      (token: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Login success!',
          showConfirmButton: false,
          timer: 1500
        })
       console.log("======================= On Login ==============================");
        console.log(token.token);
      
        localStorage.setItem('token', token.token);
        this.isLogin = true;

        // after login success
        this.router.navigate(['admin-home']);
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Login error!',
          showConfirmButton: false,
          timer: 1500
        })
      },
      () => {}
    );
  }
}