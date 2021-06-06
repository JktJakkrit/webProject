import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AirProduct } from 'src/app/models/air.model';
import { DishProduct } from 'src/app/models/dish.model';
import { FanProduct } from 'src/app/models/fan.model';
import { RefriProduct } from 'src/app/models/refri.model';
import { TvProduct } from 'src/app/models/tv.model';
import { WashProduct } from 'src/app/models/wash.model';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { CheckoutService } from 'src/app/_services/checkout.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DataUser } from 'src/app/models/user.model';
import { OtherProduct } from 'src/app/models/other.model';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/_services/register.service';
import { UserService } from 'src/app/_services/user.service';
import { ProductsAll } from 'src/app/models/product.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkout_form: FormGroup;
  countAir: AirProduct[] = [];
  countDish: DishProduct[] = [];
  countFan: FanProduct[] = [];
  countRefri: RefriProduct[] = [];
  countTv: TvProduct[] = [];
  countWash: WashProduct[] = [];
  countOther: OtherProduct[] = [];

  countProduct: ProductsAll[] = [];
  userData: DataUser;
  // dataUser;
  public get counter() {
    var counters: number = 0;
    counters += this.countProduct.length || 0;
    // counters += this.countProduct.length || 0;
    return counters;
  }

  constructor(
    private formBuilder: FormBuilder,
    private cartDataService: CartDataServiceService,
    private checkoutService: CheckoutService,
    private router: Router,
    private registerService: RegisterService,
    private userService: UserService
  ) {
    this.checkout_form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      card: new FormControl('', [Validators.required]),
      number_card: new FormControl('', [Validators.required]),
      expMonth: new FormControl('', [Validators.required]),
      expYear: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required]),
    });

    this.cartDataService.currentProductsAll.subscribe((data) => {
      if (data) {
        this.countProduct = data;
      }
    });
  }
  mastercheckout;

  ngOnInit() {
    this.userService.currentDataUser.subscribe((data) => {
      if (data) {
        console.log(data);

        this.userData = data;
        this.checkout_form.patchValue({
          name: data.name,
          email: data.email,
          address: data.address,
          city: data.city,
          phone: data.phone,
          state: data.state,
          zip: data.zip,
        });
      }
    });
  }

  onSubmit(form: any) {
    console.log(this.checkout_form);

    if (!this.checkout_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.checkoutService
        .addCheckOut(
          form.value.name,
          form.value.email,
          form.value.address,
          form.value.city,
          form.value.phone,
          form.value.state,
          form.value.zip,
          form.value.card,
          form.value.number_card,
          form.value.expMonth,
          form.value.expYear,
          form.value.cvv
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'checkout successful.', 'success');
            this.router.navigate(['success']);
          },
          (error) => {
            if (error.status === 200 || error.status === 201) {
              Swal.fire('Error!', 'error : ' + error.status, 'error');

              // this.loadDataMaster();
            } else {
              console.log(error.status);
              Swal.fire('Error!', 'error : ' + error.status, 'error');
            }
          }
        );
    }
  }

  loadUser(event) {
    this.userService.changeDataUser(event.target.value);
  }


  TotalProductPrice(count, price): number {
    return count * price;
  }

  ProductChangeAmount(event, ProductItem) {
    console.log(event.target.value);
    this.cartDataService.updateAmountProductAll(
      ProductItem,
      event.target.value
    );
    this.calTotalAll().toFixed(2);
    this.calTotalVAT7all().toFixed(2);
  }

  removeItem(item) {
    this.cartDataService.removeProductItem(item);
  }

  calTotalAll() {
    const callBack = (sum, curr) => sum + curr.price * curr.count;

    const sum = !!this.countProduct.length
      ? this.countProduct.reduce(callBack, 0)
      : 0;

    // return sum + (sum * 0.07) + (sum * 0.93);
    return sum + sum * 0.07;
  }
  calTotalVAT7all() {
    const callBack = (sum, curr) => sum + curr.price * curr.count;

    const sum = !!this.countProduct.length
      ? this.countProduct.reduce(callBack, 0)
      : 0;

    // return sum + (sum * 0.07) + (sum * 0.93);
    return sum * 0.07;
  }

  //-----------------------------
}
