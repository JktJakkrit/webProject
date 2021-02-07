import { FanProduct } from './../../../models/fan.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { FormBuilder } from '@angular/forms';
import { AirProduct } from 'src/app/models/air.model';
import { DishProduct } from 'src/app/models/dish.model';
import { RefriProduct } from 'src/app/models/refri.model';
import { TvProduct } from 'src/app/models/tv.model';
import { WashProduct } from 'src/app/models/wash.model';
import { OtherProduct } from 'src/app/models/other.model';
import Swal from 'sweetalert2';
import { RegisterService } from 'src/app/_services/register.service';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  dataUser;
  countAir: AirProduct[] = [];
  countDish: DishProduct[] = [];
  countFan: FanProduct[] = [];
  countRefri: RefriProduct[] = [];
  countTv: TvProduct[] = [];
  countWash: WashProduct[] = [];
  countOther: OtherProduct[] = [];

  public get counter() {
    var counters: number = 0;
    counters += this.countAir.length || 0;
    counters += this.countDish.length || 0;
    counters += this.countFan.length || 0;
    counters += this.countRefri.length || 0;
    counters += this.countTv.length || 0;
    counters += this.countWash.length || 0;
    counters += this.countOther.length || 0;
    // counters += this.countProduct.length || 0;
    return counters;
  }
  constructor(
    private formBuilder: FormBuilder,
    private cartDataService: CartDataServiceService,
    private registerService: RegisterService,

    private router: Router
  ) {
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

  ngOnInit(): void {}

  airTotalPrice(count, price): number {
    return count * price;
  }

  airChangeAmount(event, airItem) {
    console.log(event.target.value);
    this.cartDataService.updateAmountAirProduct(airItem, event.target.value);
    this.calTotalPriceAllProduct().toFixed(2);
    this.calTotalVAT7().toFixed(2);
  }

  //-----------------------------
  dishTotalPrice(count, price): number {
    return count * price;
  }
  dishChangeAmount(event, dishItem) {
    console.log(event.target.value);
    this.cartDataService.updateAmountDishProduct(dishItem, event.target.value);
    this.calTotalPriceAllProduct().toFixed(2);
    this.calTotalVAT7().toFixed(2);
  }

  //-----------------------------
  fanTotalPrice(count, price): number {
    return count * price;
  }
  fanChangeAmount(event, fanItem) {
    console.log(event.target.value);
    this.cartDataService.updateAmountFanProduct(fanItem, event.target.value);
    this.calTotalPriceAllProduct().toFixed(2);
    this.calTotalVAT7().toFixed(2);
  }

  //-----------------------------
  refriTotalPrice(count, price): number {
    return count * price;
  }
  refriChangeAmount(event, refriItem) {
    console.log(event.target.value);
    this.cartDataService.updateAmountRefriProduct(
      refriItem,
      event.target.value
    );
    this.calTotalPriceAllProduct().toFixed(2);
    this.calTotalVAT7().toFixed(2);
  }

  //-----------------------------
  washTotalPrice(count, price): number {
    return count * price;
  }
  washChangeAmount(event, washItem) {
    console.log(event.target.value);
    this.cartDataService.updateAmountWashProduct(washItem, event.target.value);
    this.calTotalPriceAllProduct().toFixed(2);
    this.calTotalVAT7().toFixed(2);
  }

  //-----------------------------
  tvTotalPrice(count, price): number {
    return count * price;
  }
  tvChangeAmount(event, tvItem) {
    console.log(event.target.value);
    this.cartDataService.updateAmountTvProduct(tvItem, event.target.value);
    this.calTotalPriceAllProduct().toFixed(2);
    this.calTotalVAT7().toFixed(2);
  }

  //-----------------------------
  otherTotalPrice(count, price): number {
    return count * price;
  }
  otherChangeAmount(event, otherItem) {
    console.log(event.target.value);
    this.cartDataService.updateAmountOtherProduct(
      otherItem,
      event.target.value
    );
    this.calTotalPriceAllProduct().toFixed(2);
    this.calTotalVAT7().toFixed(2);
  }

  calTotalPriceAllProduct() {
    const callBack = (sum, curr) => sum + curr.price * curr.count;
    const allProduct = [
      ...this.countAir,
      ...this.countDish,
      ...this.countFan,
      ...this.countRefri,
      ...this.countTv,
      ...this.countWash,
      ...this.countOther,
    ];
    const sum = !!allProduct.length ? allProduct.reduce(callBack, 0) : 0;

    // return sum + (sum * 0.07) + (sum * 0.93);
    return sum + sum * 0.07;
  }

  calTotalVAT7() {
    const callBack = (sum, curr) => sum + curr.price * curr.count;
    const allProduct = [
      ...this.countAir,
      ...this.countDish,
      ...this.countFan,
      ...this.countRefri,
      ...this.countTv,
      ...this.countWash,
      ...this.countOther,
    ];
    const sum = !!allProduct.length ? allProduct.reduce(callBack, 0) : 0;

    // return sum + (sum * 0.07) + (sum * 0.93);
    return sum * 0.07;
  }

  loadUser() {
    this.registerService.getDataUser().subscribe(
      (res: any) => {
        this.dataUser = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
}