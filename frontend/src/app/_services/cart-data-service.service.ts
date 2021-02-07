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
import { OtherProduct } from '../models/other.model';

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

  private otherProduct = new BehaviorSubject<OtherProduct[]>([]);
  currentOtherProduct = this.otherProduct.asObservable();

  total$: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);

  constructor() {}

  changeAirProduct(data: AirProduct) {
    let air = this.airProduct.value;
    console.log('<----- Old data ----->', air);

    let findItem = air.findIndex((val) => val.air_sys_id == data.air_sys_id);

    if (findItem === -1) {
      const temp = { ...data, count: 1 };
      air.push(temp);
    } else {
      air[findItem].count++;
    }

    console.log(air);

    this.airProduct.next(air);
  }

  updateAmountAirProduct(data: AirProduct, amonut: number) {
    var air = this.airProduct.value;
    const index = air.findIndex((val) => val.air_sys_id === data.air_sys_id);
    air[index].count > amonut ? air[index].count-- : air[index].count++;

    this.airProduct.next(air);
  }

  removeAirItem(data: AirProduct) {
    let air = this.airProduct.value;
    const index = air.findIndex((val) => (val.air_sys_id = data.air_sys_id));
    air.splice(index, 1);
    this.airProduct.next(air);
  }

  // -----------------------------------------------
  changeDishProduct(data: DishProduct) {
    let dish = this.dishProduct.value;
    console.log('<----- Old data ----->', dish);

    let findItem = dish.findIndex((val) => val.dish_sys_id == data.dish_sys_id);

    if (findItem === -1) {
      const temp = { ...data, count: 1 };
      dish.push(temp);
    } else {
      dish[findItem].count++;
    }

    console.log(dish);

    this.dishProduct.next(dish);
  }

  updateAmountDishProduct(data: DishProduct, amonut: number) {
    var dish = this.dishProduct.value;
    const index = dish.findIndex((val) => val.dish_sys_id === data.dish_sys_id);
    dish[index].count > amonut ? dish[index].count-- : dish[index].count++;

    this.dishProduct.next(dish);
  }

  removeDishItem(data: DishProduct) {
    var dish = this.dishProduct.value;
    const index = dish.findIndex((val) => val.dish_sys_id === data.dish_sys_id);
    dish.splice(index, 1);
    this.dishProduct.next(dish);
  }

  // -----------------------------------------------
  changeFanProduct(data: FanProduct) {
    let fan = this.fanProduct.value;
    console.log('<----- Old data ----->', fan);

    let findItem = fan.findIndex((val) => val.fan_sys_id == data.fan_sys_id);

    if (findItem === -1) {
      const temp = { ...data, count: 1 };
      fan.push(temp);
    } else {
      fan[findItem].count++;
    }

    console.log(fan);

    this.fanProduct.next(fan);
  }

  updateAmountFanProduct(data: FanProduct, amonut: number) {
    var fan = this.fanProduct.value;
    const index = fan.findIndex((val) => val.fan_sys_id === data.fan_sys_id);
    fan[index].count > amonut ? fan[index].count-- : fan[index].count++;

    this.fanProduct.next(fan);
  }

  removeFanItem(data: FanProduct) {
    var fan = this.fanProduct.value;
    const index = fan.findIndex((val) => val.fan_sys_id === data.fan_sys_id);
    fan.splice(index, 1);
    this.fanProduct.next(fan);
  }

  // -----------------------------------------------
  changeRefriProduct(data: RefriProduct) {
    let refri = this.refriProduct.value;
    console.log('<----- Old data ----->', refri);

    let findItem = refri.findIndex(
      (val) => val.refri_sys_id == data.refri_sys_id
    );

    if (findItem === -1) {
      const temp = { ...data, count: 1 };
      refri.push(temp);
    } else {
      refri[findItem].count++;
    }

    console.log(refri);

    this.refriProduct.next(refri);
  }
  updateAmountRefriProduct(data: RefriProduct, amonut: number) {
    var refri = this.refriProduct.value;
    const index = refri.findIndex(
      (val) => val.refri_sys_id === data.refri_sys_id
    );
    refri[index].count > amonut ? refri[index].count-- : refri[index].count++;

    this.refriProduct.next(refri);
  }

  removeRefriItem(data: RefriProduct) {
    var refri = this.refriProduct.value;
    const index = refri.findIndex(
      (val) => val.refri_sys_id === data.refri_sys_id
    );
    refri.splice(index, 1);
    this.refriProduct.next(refri);
  }

  // -----------------------------------------------
  changeTvProduct(data: TvProduct) {
    let tv = this.tvProduct.value;
    console.log('<----- Old data ----->', tv);

    let findItem = tv.findIndex((val) => val.tv_sys_id == data.tv_sys_id);

    if (findItem === -1) {
      const temp = { ...data, count: 1 };
      tv.push(temp);
    } else {
      tv[findItem].count++;
    }

    console.log(tv);

    this.tvProduct.next(tv);
  }
  updateAmountTvProduct(data: TvProduct, amonut: number) {
    var tv = this.tvProduct.value;
    const index = tv.findIndex((val) => val.tv_sys_id === data.tv_sys_id);
    tv[index].count > amonut ? tv[index].count-- : tv[index].count++;

    this.tvProduct.next(tv);
  }

  removeTvItem(data: TvProduct) {
    var tv = this.tvProduct.value;
    const index = tv.findIndex((val) => val.tv_sys_id === data.tv_sys_id);
    tv.splice(index, 1);
    this.tvProduct.next(tv);
  }

  // -----------------------------------------------

  changeWashProduct(data: WashProduct) {
    let wash = this.washProduct.value;
    console.log('<----- Old data ----->', wash);

    let findItem = wash.findIndex((val) => val.wash_sys_id == data.wash_sys_id);

    if (findItem === -1) {
      const temp = { ...data, count: 1 };
      wash.push(temp);
    } else {
      wash[findItem].count++;
    }

    console.log(wash);

    this.washProduct.next(wash);
  }
  updateAmountWashProduct(data: WashProduct, amonut: number) {
    var wash = this.washProduct.value;
    const index = wash.findIndex((val) => val.wash_sys_id === data.wash_sys_id);
    wash[index].count > amonut ? wash[index].count-- : wash[index].count++;

    this.washProduct.next(wash);
  }

  removeWashItem(data: WashProduct) {
    var wash = this.washProduct.value;
    const index = wash.findIndex((val) => val.wash_sys_id === data.wash_sys_id);
    wash.splice(index, 1);
    this.washProduct.next(wash);
  }

  // -----------------------------------------------

  changeOtherProduct(data: OtherProduct) {
    let other = this.otherProduct.value;
    console.log('<----- Old data ----->', other);

    let findItem = other.findIndex(
      (val) => val.other_sys_id == data.other_sys_id
    );

    if (findItem === -1) {
      const temp = { ...data, count: 1 };
      other.push(temp);
    } else {
      other[findItem].count++;
    }

    console.log(other);

    this.otherProduct.next(other);
  }
  updateAmountOtherProduct(data: OtherProduct, amonut: number) {
    var other = this.otherProduct.value;
    const index = other.findIndex(
      (val) => val.other_sys_id === data.other_sys_id
    );
    other[index].count > amonut ? other[index].count-- : other[index].count++;

    this.otherProduct.next(other);
  }
  removeOtherItem(data: OtherProduct) {
    let other = this.otherProduct.value;
    const index = other.findIndex(
      (val) => (val.other_sys_id = data.other_sys_id)
    );
    other.splice(index, 1);
    this.otherProduct.next(other);
  }
}
