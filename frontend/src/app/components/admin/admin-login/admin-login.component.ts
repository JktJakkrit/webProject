import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  admin_form: FormGroup;
  constructor(private authService: AuthService, private _commondata: CommonDataService, private router: Router, private formBuilder: FormBuilder) {
    this.admin_form = this.formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      status: new FormControl("admin", [Validators.required]),
     
    });
   }

   ngOnInit() {
    if (this.authService.isLogin()) {
      this.router.navigate(['admin-login']);
    }
    setTimeout((_) => this._commondata.showLoader(false), 200);
  }

  isLogin = false;

  public onSubmit(form: any) {
    // this.authService.login("test","test").subscribe(
      
      this.authService.adminLogin(form.value.username,form.value.password,form.value.status).subscribe(
      (token: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Login success!',
          showConfirmButton: false,
          timer: 1500
        })
      //  console.log("======================= On Login ==============================");
      //  console.log(token);
      //  this.authService.isLogin();
      //   console.log(token.token);
      
        // localStorage.setItem('currentUser', token.token);
        // this.isLogin = true;
       
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

  logout(){
    this.authService.logOut();
  }

 
}
