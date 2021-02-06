import { CartDataServiceService } from './../../../_services/cart-data-service.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AirProduct } from 'src/app/models/air.model';
import { DishProduct } from 'src/app/models/dish.model';
import { FanProduct } from 'src/app/models/fan.model';
import { RefriProduct } from 'src/app/models/refri.model';
import { TvProduct } from 'src/app/models/tv.model';
import { WashProduct } from 'src/app/models/wash.model';
import { CartProduct } from 'src/app/models/cart.model';
import { OtherProduct } from 'src/app/models/other.model';
import { data } from 'jquery';

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
  countOther: OtherProduct[] = [];
  value: 1;
  totalAir: number = 0;
  // countProduct: CartProduct[] = [];
  totalPriceAllProduct :number = 0 ;
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

    this.cartDataService.currentOtherProduct.subscribe((data)=> {
      if(data){
        this.countOther = data;
      }
    });
  }

  airTotalPrice(count, price) : number {
    return count * price;
  }

  airChangeAmount(event,airItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountAirProduct(airItem,event.target.value);
    this.calTotalPriceAllProduct().toFixed(2);
    this.calTotalVAT7().toFixed(2)
  }

  removeAirItem(item) {
    this.cartDataService.removeAirItem(item);
  }
//-----------------------------
  dishTotalPrice(count, price) : number {
    
    return count * price;
  }
  dishChangeAmount(event,dishItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountDishProduct(dishItem,event.target.value);
    this.calTotalPriceAllProduct().toFixed(2);
    this.calTotalVAT7().toFixed(2)
  }
  removeDishItem(item) {
    this.cartDataService.removeDishItem(item);
  }
  //-----------------------------
  fanTotalPrice(count, price) : number {
    
    return count * price;
  }
  fanChangeAmount(event,fanItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountFanProduct(fanItem,event.target.value);
    this.calTotalPriceAllProduct().toFixed(2);
    this.calTotalVAT7().toFixed(2)
  }
  removeFanItem(item) {
    this.cartDataService.removeFanItem(item);
  }
  //-----------------------------
  refriTotalPrice(count, price) : number {
    
    return count * price;
  }
  refriChangeAmount(event,refriItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountRefriProduct(refriItem,event.target.value);
    this.calTotalPriceAllProduct().toFixed(2);
    this.calTotalVAT7().toFixed(2)
  }
  removeRefriItem(item) {
    this.cartDataService.removeRefriItem(item);
  }
  //-----------------------------
  washTotalPrice(count, price) : number {
    
    return count * price;
  }
  washChangeAmount(event,washItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountWashProduct(washItem,event.target.value);
    this.calTotalPriceAllProduct().toFixed(2);
    this.calTotalVAT7().toFixed(2)
  }
  removeWashItem(item) {
    this.cartDataService.removeWashItem(item);
  }
  //-----------------------------
  tvTotalPrice(count,price) : number {
    
    return count * price;
  }
  tvChangeAmount(event,tvItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountTvProduct(tvItem,event.target.value);
    this.calTotalPriceAllProduct().toFixed(2);
    this.calTotalVAT7().toFixed(2)
  }
  removeTvItem(item) {
    this.cartDataService.removeTvItem(item);
  }
 //-----------------------------
 otherTotalPrice(count,price) : number {
  
  return count * price;
}
otherChangeAmount(event,otherItem) {
  console.log(event.target.value );
  this.cartDataService.updateAmountOtherProduct(otherItem,event.target.value);
  this.calTotalPriceAllProduct().toFixed(2);
  this.calTotalVAT7().toFixed(2)
}
removeOtherItem(item) {
  this.cartDataService.removeOtherItem(item);
}
  ngOnInit(): void {
    // this.calTotalPriceAllProduct();
  }


calTotalPriceAllProduct() {
  const callBack = (sum, curr) => sum + (curr.price * curr.count);
  const allProduct = [...this.countAir, ...this.countDish, ...this.countFan, ...this.countRefri, ...this.countTv, ...this.countWash, ...this.countOther]
  const sum = !!allProduct.length ? allProduct.reduce(callBack, 0) : 0;

  // return sum + (sum * 0.07) + (sum * 0.93);
  return sum + (sum * 0.07);
}

calTotalVAT7() {
  const callBack = (sum, curr) => sum + (curr.price * curr.count);
  const allProduct = [...this.countAir, ...this.countDish, ...this.countFan, ...this.countRefri, ...this.countTv, ...this.countWash, ...this.countOther]
  const sum = !!allProduct.length ? allProduct.reduce(callBack, 0) : 0;

  // return sum + (sum * 0.07) + (sum * 0.93);
  return sum * 0.07;
}


}
