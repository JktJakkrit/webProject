import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/common-data.service';
import { AirProduct } from 'src/app/models/air.model';
import { CartProduct } from 'src/app/models/cart.model';

import { DishProduct } from 'src/app/models/dish.model';
import { FanProduct } from 'src/app/models/fan.model';
import { OtherProduct } from 'src/app/models/other.model';
import { RefriProduct } from 'src/app/models/refri.model';
import { TvProduct } from 'src/app/models/tv.model';
import { WashProduct } from 'src/app/models/wash.model';
import { AuthService } from 'src/app/_services/auth.service';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
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
  countAir: AirProduct[] = [];
  countDish: DishProduct[] = [];
  countFan: FanProduct[] = [];
  countRefri: RefriProduct[] = [];
  countTv: TvProduct[] = [];
  countWash: WashProduct[] = [];
  countOther: OtherProduct[] = [];

  register_form: FormGroup;
  public get counter() {
    var counters: number = 0;
    counters += this.countAir.length || 0;
    counters += this.countDish.length || 0;
    counters += this.countFan.length || 0;
    counters += this.countRefri.length || 0;
    counters += this.countTv.length || 0;
    counters += this.countWash.length || 0;
    counters += this.countOther.length || 0;
    return counters;
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  constructor(
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
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
    });


    this.cartDataService.currentAirProduct.subscribe((data) => {
      if (data) {
        this.countAir = data;
      }
    });

    this.cartDataService.currentDishProduct.subscribe((data) => {
      if (data) {
        this.countDish = data;
      }
    });

    this.cartDataService.currentFanProduct.subscribe((data) => {
      if (data) {
        this.countFan = data;
      }
    });

    this.cartDataService.currentRefriProduct.subscribe((data) => {
      if (data) {
        this.countRefri = data;
      }
    });

    this.cartDataService.currentTvProduct.subscribe((data) => {
      if (data) {
        this.countTv = data;
      }
    });

    this.cartDataService.currentWashProduct.subscribe((data) => {
      if (data) {
        this.countWash = data;
      }
    });

    this.cartDataService.currentOtherProduct.subscribe((data) => {
      if (data) {
        this.countOther = data;
      }
    });

  }
 
  OnSubmit(form: any){
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
          form.value.zip
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'Register successful.', 'success');
          },
          (error) => {
            if (error.status === 200 || error.status === 201) {
              Swal.fire('Error!', 'error : ' + error.status, 'error');
              this.closeModal('register');
              // this.loadDataMaster();
            } else {
              console.log(error.status);
              Swal.fire('Error!', 'error : ' + error.status, 'error');
            }
          }
        );
    }
  }


 
  ngOnInit() {
   
  }

  editcate(trdata){
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

}


  

