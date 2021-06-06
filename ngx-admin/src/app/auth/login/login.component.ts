import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent implements OnInit {
  login_form: FormGroup;

  constructor(
  
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.login_form  = this.formBuilder.group({
     username: ['', Validators.required],
     password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.authService.isLogin()) {
      this.router.navigate(['login']);
    }
    // setTimeout((_) => this._commondata.showLoader(false), 200);
  }
 
  isLogin = false;

  login(form: any) {
    console.log(form);
    
    if (!this.login_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      console.log(form.value);
      this.authService
        .login(
          form.value.username,
          form.value.password,
         
        )
        .subscribe(
          (token: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Login success!',
              showConfirmButton: false,
              timer: 1500
            })
            console.log(form);
            
           console.log("======================= On Login ==============================");
            console.log(token.token);
           console.log("======================= On Login ==============================");
    
            
            localStorage.setItem('token', token.token);
            this.isLogin = true;
    
            // after login success
            this.router.navigate(['pages/tables/show-product']);
          },
          (error) => {
            if (error.status) {
              Swal.fire('Error!', 'error : ' + error.status, 'error');
              // this.closeModal('modal_add');
              // this.loadDataBooking();
              // this.loader = false;
            // } else {
            //   console.log(error.status);
            //   Swal.fire('Time is NOT READY!', 'Please Check Time Again!', 'warning');
            //   // this.loader = false;
            }
          }
        );
    }
  }


}


