
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CartProduct } from '../models/cart.model';
import { state } from '@angular/animations';

import { ProductsAll } from '../models/product.model';
import { count } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartDataServiceService {
  
  private productAll = new BehaviorSubject<ProductsAll[]>([]);
  currentProductsAll = this.productAll.asObservable();

  

  total$: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);

  constructor() {}

  changeProductAll(data: ProductsAll) {
    let all = this.productAll.value;
    console.log('<----- Old data ----->', all);
    let findItem = all.findIndex(
      (val) => val.product_sys_id == data.product_sys_id
    );

    if (findItem === -1) {
      const temp = { ...data, count: 1 };
      all.push(temp);
    } else {
      all[findItem].count++;
    }
    console.log(all);

    this.productAll.next(all);
  }

  updateAmountProductAll(data: ProductsAll, amonut: number) {
    var all = this.productAll.value;
    const index = all.findIndex((val) => val.product_sys_id === data.product_sys_id);
    all[index].count > amonut ? all[index].count-- : all[index].count++;

    this.productAll.next(all);
  }

  removeProductItem(data: ProductsAll) {
    let all = this.productAll.value;
    const index = all.findIndex((val) => (val.product_sys_id = data.product_sys_id));
    all.splice(index, 1);
    this.productAll.next(all);
  }

}
