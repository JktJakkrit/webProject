import { CartDataServiceService } from './../../../_services/cart-data-service.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { data } from 'jquery';
import { ProductsAll } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  value: 1;
  totalAir: number = 0;
  countProduct: ProductsAll[] = [];

  totalPriceAllProduct: number = 0;

  constructor(private cartDataService: CartDataServiceService) {
    this.cartDataService.currentProductsAll.subscribe((data) => {
      if (data) {
        this.countProduct = data;
      }
    });
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
  //-----------------------------

  ngOnInit(): void {
    // this.calTotalPriceAllProduct();
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

  totalSum(){
    const callBack = (sum, curr) => sum + curr.price * curr.count;

    const sum = !!this.countProduct.length
      ? this.countProduct.reduce(callBack, 0)
      : 0;
    return sum;

  }
}
