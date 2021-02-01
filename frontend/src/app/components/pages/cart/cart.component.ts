import { CartDataServiceService } from './../../../_services/cart-data-service.service';
import { Component, OnInit } from '@angular/core';
import { AirProduct } from 'src/app/models/air.model';
import { DishProduct } from 'src/app/models/dish.model';
import { FanProduct } from 'src/app/models/fan.model';
import { RefriProduct } from 'src/app/models/refri.model';
import { TvProduct } from 'src/app/models/tv.model';
import { WashProduct } from 'src/app/models/wash.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  countAir: AirProduct[];
  countDish: DishProduct[];
  countFan: FanProduct[];
  countRefri: RefriProduct[];
  countTv: TvProduct[];
  countWash: WashProduct[];
  constructor(private cartDataService: CartDataServiceService) { 
    this.cartDataService.currentAirProduct.subscribe((data) => {
    if (data) {
      this.countAir = data;
    }
  });

  this.cartDataService.currentDishProduct.subscribe((data) =>{
    if(data){
      this.countDish = data;
    }
  });

  this.cartDataService.currentFanProduct.subscribe((data) =>{
    if(data){
      this.countFan = data;
    }
  });

  this.cartDataService.currentRefriProduct.subscribe((data)=>{
    if(data){
      this.countRefri = data;
    }
  });

  this.cartDataService.currentTvProduct.subscribe((data)=>{
    if(data){
      this.countTv = data;
    }
  })
  
  this.cartDataService.currentWashProduct.subscribe((data)=>{
    if(data){
      this.countWash = data;
    }
  })

}

  ngOnInit(): void {
  }

}
