import { Injectable } from '@angular/core';

// import { CartModel } from 'src/app/models/counter.state';
import { AddCart } from 'src/app/_services/ngxs-store/action/cart-action'; 
// @State<CartModel>({ 
//     name :"",
//     // defaults: {
//     //     // airProduct: [],
//     //     // tvProduct: [],
//     //     // dishProduct: [],
//     //     // washProduct: [],
//     //     // refriProduct: [],
//     //     // fanProduct: [],
//     //   }
// })
@Injectable()
export class CounterState {
  constructor() {}

// @Action(AddCart)
//   increase(ctx: StateContext<CartModel>, action: AddCart) {
//     const state = ctx.getState();
//     ctx.setState({
//       ...state,
//     //   airProduct  : [],
//     //   tvProduct: [],
//     //   dishProduct: [],
//     //   washProduct: [],
//     //   refriProduct: [],
//     //   fanProduct: [],
//     });
    
  // }
}