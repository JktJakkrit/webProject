import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/common-data.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login_form: FormGroup;

  constructor(private authService: AuthService, private _commondata: CommonDataService, private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
    this.login_form = this.formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
     
    });
  }

  ngOnInit() {
    if (this.authService.isLogin()) {
      this.router.navigate(['login']);
    }
    setTimeout((_) => this._commondata.showLoader(false), 200);
  }

  isLogin = false;

  public onSubmit(form: any) {
    // this.authService.login("test","test").subscribe(
      
      this.authService.login(form.value.username,form.value.password).subscribe(
      (token: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Login success!',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(token);
        
        
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

  logout(){
    this.authService.logOut();
  }

 
}
