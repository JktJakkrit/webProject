import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/common-data.service';
import { CartProduct } from 'src/app/models/cart.model';

import { ProductsAll } from 'src/app/models/product.model';

import { AuthService } from 'src/app/_services/auth.service';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { MasterService } from 'src/app/_services/master.service';
import { ModalService } from 'src/app/_services/modal.service';
import { RegisterService } from 'src/app/_services/register.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'ANGULAR 10 ';
  currentUser: any;
  register_form: FormGroup;
  Islogin: boolean;
  category;
  listProvinces;
  listDistrict;
  listSubdistrict;
  selectedDistrict;
  selected;
  listZip;
  selectedSubdistrict;
  countProduct: ProductsAll[] = [];
  profileForm: FormGroup;
  public get counter() {
    var counters: number = 0;
    counters += this.countProduct.length || 0;
    return counters;
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  constructor(
    private masterService: MasterService,
    private cartDataService: CartDataServiceService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private authService: AuthService,
    private _commondata: CommonDataService,
    private router: Router
  ) {
    this.register_form = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?))?[0-9]{10}$'),
      ]),
      state: new FormControl('', [Validators.required]),
      sub: new FormControl('', [Validators.required]),
      zip: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });

    this.cartDataService.currentProductsAll.subscribe((data) => {
      if (data) {
        this.countProduct = data;
      }
    });

    // this.profileForm.patchValue({
    //   zip_code: new FormControl('', [Validators.required]),
    // });

    // this.authService.isLogin.subscribe(x => this.isLogin = x);
  }

  OnSubmit(form: any) {
    console.log(this.register_form);

    if (!this.register_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.registerService
        .onRegister(
          form.value.username,
          form.value.password,
          form.value.name,
          form.value.email,
          form.value.address,
          form.value.city,
          form.value.phone,
          form.value.state,
          form.value.sub,
          form.value.zip
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'Register successful.', 'success');
          },
          (error) => {
            if (error.status === 200 || error.status === 201) {
              console.log('subminheader')
              Swal.fire('Error!', 'error : ' + error.status, 'error');
              this.closeModal('register');
              // this.loadDataMaster();
            } else {
              console.log(error.status);
              console.log('header')
              Swal.fire('Error!', 'error : ' + error.status, 'error');
            }
          }
        );
    }
  }

  ngOnInit() {
    this.Islogin = this.authService.isLogin();
    // console.log(this.Islogin);
    this.loadCategoryList();
    this.loadProvinces();
  }

  editcate(trdata) {
    this.register_form.controls['regis_sys_id'].setValue(trdata.regis_sys_id);
    this.register_form.controls['name'].setValue(trdata.name);
    this.register_form.controls['email'].setValue(trdata.email);
    this.register_form.controls['address'].setValue(trdata.address);
    this.register_form.controls['city'].setValue(trdata.city);
    this.register_form.controls['phone'].setValue(trdata.phone);
    this.register_form.controls['state'].setValue(trdata.state);
    this.register_form.controls['zip'].setValue(trdata.zip);

    // this.modalService.open('modal_editcate');
  }
  logout() {
    this.authService.logOut();
    Swal.fire('Logout!', 'Your is Logout..', 'info');
    window.location.reload();
    this.router.navigate(['home']);
  }
  login(): void {
    this.router.navigate(['login']);
  }

  loadCategoryList() {
    this.masterService.loadCategory().subscribe(
      (res: any) => {
        // console.log(res);

        this.category = res;
      }
    );
  }

  get f() {
    return this.register_form.controls;
  }

  get email() {
    return this.register_form.get('email');
  }

  // -------------------------------------
  loadProvinces() {
    this.masterService.getProvinces().subscribe(
      (res: any) => {
        // console.log('จังหวัด ' + res);

        this.listProvinces = res;
      },
      (error) => {
        // console.log('error' + error.status);
      }
    );
  }

  onOptionsSelected(event) {
    const value = event.target.value;
    this.selected = value;

    console.log('เลือกจังหวัด ' + value);
    this.loadFind_listDistrict();
  }
  loadFind_listDistrict() {
    // console.log(this.selected);

    this.masterService.getDistrict(this.selected).subscribe(
      (res: any) => {
        // console.log('อำเภอ ' + res);

        this.listDistrict = res;
        // console.log('find อำเภอ ' + this.listDistrict);
      },
      (error) => {
        console.log('header')
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }

  // ---------------------------------------------
  onOptionsSelectedDistrict(event) {
    const value = event.target.value;
    this.selectedDistrict = value;

    console.log('เลือกอำเภอ ' + value);
    this.loadFind_listSubdistrict();
  }
  loadFind_listSubdistrict() {
    // console.log(this.selectedDistrict);

    this.masterService.getSubdistrict(this.selectedDistrict).subscribe(
      (res: any) => {
        // console.log('ตำบล ' + res);

        this.listSubdistrict = res;
        // console.log('find ตำบล ' + this.listSubdistrict);
      },
      (error) => {
        console.log('header')
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }

  onOptionsSelectedSubdistrict(event) {
    
    const value = event.target.value;
    this.selectedSubdistrict = value;

    console.log('เลือกตำบลน้าาาาาาาาา ' + value);
    // this.register_form.patchValue({
    //   zip: value
    // });
    this.loadZipcode();
  
  }

  loadZipcode() {
    // console.log(this.selectedDistrict);

    this.masterService.getZipCode(this.selectedSubdistrict).subscribe(
      (res: any) => {
        console.log('Zip Code ' , res);

        this.listZip = res;
        // console.log('find ตำบล ' + this.listSubdistrict);
      },
      (error) => {
        console.log('header')
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }


}
