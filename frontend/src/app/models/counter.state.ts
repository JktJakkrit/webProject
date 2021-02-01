import { AirProduct } from "./air.model";
import { DishProduct } from "./dish.model";
import { FanProduct } from "./fan.model";
import { RefriProduct } from "./refri.model";
import { TvProduct } from "./tv.model";
import { WashProduct } from "./wash.model";

export interface CartModel { 
    airProduct: AirProduct[];
    dishProduct: DishProduct[];
    fanProduct: FanProduct[];
    refriProduct: RefriProduct[];
    tvProduct: TvProduct[];
    washProduct: WashProduct[];
 }

 
