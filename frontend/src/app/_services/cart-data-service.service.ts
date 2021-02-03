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


  changeAirProduct(data: AirProduct) {
    var air = this.airProduct.value;
   var found = air.find((v,i)=>{ 
     var check = v.air_sys_id == data.air_sys_id;
     if(check)   v.amount ++ ;
      return check;
    })
    if(!found){

      air.push(data);
    }
   
    console.log(air);
    
    this.airProduct.next(air);
  }
  updateAmountAirProduct(data: AirProduct,amonut : number) {
    var air = this.airProduct.value;
    air.forEach((v)=>{
      var check = v.air_sys_id == data.air_sys_id;
      if(check) v.amount = amonut;
    })

    this.airProduct.next(air);
  }
// -----------------------------------------------
  changeDishProduct(data: DishProduct) {
    var dish = this.dishProduct.value;
    var found = dish.find((v,i)=>{ 
      var check = v.dish_sys_id == data.dish_sys_id;
      if(check)   v.amount ++ ;
       return check;
     })
     if(!found){
 
      dish.push(data);
     }
    
     console.log(dish);

    this.dishProduct.next(dish);
  }

  updateAmountDishProduct(data: DishProduct,amonut : number) {
    var dish = this.dishProduct.value;
    dish.forEach((v)=>{
      var check = v.dish_sys_id == data.dish_sys_id;
      if(check) v.amount = amonut;
    })

    this.dishProduct.next(dish);
  }

// -----------------------------------------------
  changeFanProduct(data: FanProduct) {
    var fan = this.fanProduct.value;
    var found = fan.find((v,i)=>{ 
      var check = v.fan_sys_id == data.fan_sys_id;
      if(check)   v.amount ++ ;
       return check;
     })
     if(!found){
 
      fan.push(data);
     }
    
     console.log(fan);
     
    this.fanProduct.next(fan);
  }

  updateAmountFanProduct(data: FanProduct,amonut : number) {
    var fan = this.fanProduct.value;
    fan.forEach((v)=>{
      var check = v.fan_sys_id == data.fan_sys_id;
      if(check) v.amount = amonut;
    })

    this.fanProduct.next(fan);
  }

// -----------------------------------------------
  changeRefriProduct(data: RefriProduct) {
    var refri = this.refriProduct.value;
    var found = refri.find((v,i)=>{ 
      var check = v.refri_sys_id == data.refri_sys_id;
      if(check)   v.amount ++ ;
       return check;
     })
     if(!found){
 
      refri.push(data);
     }
    
     console.log(refri);

    this.refriProduct.next(refri);
  }
  updateAmountRefriProduct(data: RefriProduct,amonut : number) {
    var refri = this.refriProduct.value;
    refri.forEach((v)=>{
      var check = v.refri_sys_id == data.refri_sys_id;
      if(check) v.amount = amonut;
    })

    this.refriProduct.next(refri);
  }
  // -----------------------------------------------
  changeTvProduct(data: TvProduct) {
    var tv = this.tvProduct.value;
    var found = tv.find((v,i)=>{ 
      var check = v.tv_sys_id == data.tv_sys_id;
      if(check)   v.amount ++ ;
       return check;
     })
     if(!found){
 
      tv.push(data);
     }
    
     console.log(tv);

    this.tvProduct.next(tv);
  }
  updateAmountTvProduct(data: TvProduct,amonut : number) {
    var tv = this.tvProduct.value;
    tv.forEach((v)=>{
      var check = v.tv_sys_id == data.tv_sys_id;
      if(check) v.amount = amonut;
    })

    this.tvProduct.next(tv);
  }
  // -----------------------------------------------

  changeWashProduct(data: WashProduct) {
    var wash = this.washProduct.value;
    var found = wash.find((v,i)=>{ 
      var check = v.wash_sys_id == data.wash_sys_id;
      if(check)   v.amount ++ ;
       return check;
     })
     if(!found){
 
      wash.push(data);
     }
    
     console.log(wash);

    this.washProduct.next(wash);
  }
  updateAmountWashProduct(data: WashProduct,amonut : number) {
    var wash = this.washProduct.value;
    wash.forEach((v)=>{
      var check = v.wash_sys_id == data.wash_sys_id;
      if(check) v.amount = amonut;
    })

    this.washProduct.next(wash);
  }

  // -----------------------------------------------

}
