import { CartDataServiceService } from './../../../_services/cart-data-service.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AirProduct } from 'src/app/models/air.model';
import { DishProduct } from 'src/app/models/dish.model';
import { FanProduct } from 'src/app/models/fan.model';
import { RefriProduct } from 'src/app/models/refri.model';
import { TvProduct } from 'src/app/models/tv.model';
import { WashProduct } from 'src/app/models/wash.model';
import { CartProduct } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  countAir: AirProduct[] = [];
  countDish: DishProduct[] = [];
  countFan: FanProduct[] = [];
  countRefri: RefriProduct[] = [];
  countTv: TvProduct[] = [];
  countWash: WashProduct[] = [];

  totalAir: number = 0;
  // countProduct: CartProduct[] = [];
to
  constructor(private cartDataService: CartDataServiceService) {

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
  }


  airTotalPrice(amount,price) : number {
    return amount * price;
  }
  airChangeAmount(event,airItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountAirProduct(airItem,event.target.value);
  }
//-----------------------------
  dishTotalPrice(amount,price) : number {
    return amount * price;
  }
  dishChangeAmount(event,dishItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountDishProduct(dishItem,event.target.value);
  }
  //-----------------------------
  fanTotalPrice(amount,price) : number {
    return amount * price;
  }
  fanChangeAmount(event,fanItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountFanProduct(fanItem,event.target.value);
  }
  //-----------------------------
  refriTotalPrice(amount,price) : number {
    return amount * price;
  }
  refriChangeAmount(event,refriItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountRefriProduct(refriItem,event.target.value);
  }
  //-----------------------------
  washTotalPrice(amount,price) : number {
    return amount * price;
  }
  washChangeAmount(event,washItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountWashProduct(washItem,event.target.value);
  }
  //-----------------------------
  tvTotalPrice(amount,price) : number {
    return amount * price;
  }
  tvChangeAmount(event,tvItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountTvProduct(tvItem,event.target.value);
  }

 
  ngOnInit(): void {}


  
}
