import { Component, OnInit } from '@angular/core';
import { AirProduct } from 'src/app/models/air.model';
import { CartModelServer } from 'src/app/models/cart.model';
import { DishProduct } from 'src/app/models/dish.model';
import { FanProduct } from 'src/app/models/fan.model';
import { RefriProduct } from 'src/app/models/refri.model';
import { TvProduct } from 'src/app/models/tv.model';
import { WashProduct } from 'src/app/models/wash.model';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { CartService } from 'src/app/_services/cart.service';

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
  public get counter() {
    var counters: number = 0;
    counters += this.countAir.length || 0;
    counters += this.countDish.length || 0;
    counters += this.countFan.length || 0;
    counters += this.countRefri.length || 0;
    counters += this.countTv.length || 0;
    counters += this.countWash.length || 0;
    return counters;
  }

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
  ngOnInit() {}
}
