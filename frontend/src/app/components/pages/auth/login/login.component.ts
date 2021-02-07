import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/common-data.service';
import { AuthService } from 'src/app/_services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService, private _commondata: CommonDataService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLogin()) {
      this.router.navigate(['login']);
    }
    setTimeout((_) => this._commondata.showLoader(false), 200);
  }

  isLogin = false;

  public onSubmit(form: any) {
    this.authService.login("test","test").subscribe(
      (token: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Login success!',
          showConfirmButton: false,
          timer: 1500
        })
       console.log("======================= On Login ==============================");
       console.log(token);
       
        console.log(token.regis_sys_id);
      
        localStorage.setItem('token', token.regis_sys_id);
        this.isLogin = true;

        // after login success
        this.router.navigate(['home']);
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
