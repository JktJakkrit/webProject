import { WashProduct } from './../models/wash.model';
import { TvProduct } from './../models/tv.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AirProduct } from '../models/air.model';
import { DishProduct } from '../models/dish.model';
import { FanProduct } from '../models/fan.model';
import { RefriProduct } from '../models/refri.model';
import { CartProduct } from '../models/cart.model';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class CartDataServiceService {
  private airProduct = new BehaviorSubject<AirProduct[]>([]);
  currentAirProduct = this.airProduct.asObservable();

  private dishProduct = new BehaviorSubject<DishProduct[]>([]);
  currentDishProduct = this.dishProduct.asObservable();

  private fanProduct = new BehaviorSubject<FanProduct[]>([]);
  currentFanProduct = this.fanProduct.asObservable();

  private refriProduct = new BehaviorSubject<RefriProduct[]>([]);
  currentRefriProduct = this.refriProduct.asObservable();

  private tvProduct = new BehaviorSubject<TvProduct[]>([]);
  currentTvProduct = this.tvProduct.asObservable();

  private washProduct = new BehaviorSubject<WashProduct[]>([]);
  currentWashProduct = this.washProduct.asObservable();

  private cartProduct = new BehaviorSubject<CartProduct[]>([]);
  currentCartProduct = this.cartProduct.asObservable();

  constructor() {}

  AddProductToCart(data: CartProduct) {
    var product = this.cartProduct.value;
    product.push(data);
    this.cartProduct.next(product);
  }

  // removeCartItem(product: CartProduct): any {
  //   const index = state.cartProduct.indexOf(product);
  //   state.cartProduct.splice(index, 1);
  //   localStorage.setItem("cartItems", JSON.stringify(state.cartProduct));
  //   return true
  // }


  changeAirProduct(data: AirProduct) {
    var air = this.airProduct.value;
    air.push(data);
    this.airProduct.next(air);
  }

  changeDishProduct(data: DishProduct) {
    var dish = this.dishProduct.value;
    dish.push(data);
    this.dishProduct.next(dish);
  }
  changeFanProduct(data: FanProduct) {
    var fan = this.fanProduct.value;
    fan.push(data);
    this.fanProduct.next(fan);
  }

  changeRefriProduct(data: RefriProduct) {
    var refri = this.refriProduct.value;
    refri.push(data);
    this.refriProduct.next(refri);
  }
  changeTvProduct(data: TvProduct) {
    var tv = this.tvProduct.value;
    tv.push(data);
    this.tvProduct.next(tv);
  }

  changeWashProduct(data: WashProduct) {
    var wash = this.washProduct.value;
    wash.push(data);
    this.washProduct.next(wash);
  }
}
