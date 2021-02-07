import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AirProduct } from 'src/app/models/air.model';
import { DishProduct } from 'src/app/models/dish.model';
import { FanProduct } from 'src/app/models/fan.model';
import { OtherProduct } from 'src/app/models/other.model';
import { RefriProduct } from 'src/app/models/refri.model';
import { TvProduct } from 'src/app/models/tv.model';
import { WashProduct } from 'src/app/models/wash.model';
import { AirService } from 'src/app/_services/air.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { DishService } from 'src/app/_services/dish.service';
import { FanService } from 'src/app/_services/fan.service';
import { ModalService } from 'src/app/_services/modal.service';
import { OtherService } from 'src/app/_services/other.service';
import { RefriService } from 'src/app/_services/refri.service';
import { TvService } from 'src/app/_services/tv.service';
import { WashService } from 'src/app/_services/wash.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css'],
})
export class AllProductComponent implements OnInit {
  masterAir: AirProduct[];
  masterDishwasher: DishProduct[];
  masterFans: FanProduct[];
  masterOther: OtherProduct[];
  masterRefrigerator: RefriProduct[];
  masterTelevision: TvProduct[];
  masterWashingMachine: WashProduct[];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private cartDataService: CartDataServiceService,
    private airService: AirService,
    private dishService: DishService,
    private fanService: FanService,
    private refriService: RefriService,
    private washService: WashService,
    private tvService: TvService,
    private otherService: OtherService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAirCondition();
    this.loadDishwasher();
    this.loadElectricFan();
    this.loadOther();
    this.loadRefrigerator();
    this.loadTelevision();
    this.loadWashing();
  }
  loadAirCondition() {
    this.airService.getMasterAirs().subscribe(
      (res: AirProduct[]) => {
        console.log(res);

        this.masterAir = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  loadDishwasher() {
    this.dishService.getMasterDishs().subscribe(
      (res: DishProduct[]) => {
        this.masterDishwasher = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  loadElectricFan() {
    this.fanService.getMasterFans().subscribe(
      (res: FanProduct[]) => {
        this.masterFans = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  loadOther() {
    this.otherService.getMasterOther().subscribe(
      (res: OtherProduct[]) => {
        console.log(res);

        this.masterOther = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  loadRefrigerator() {
    this.refriService.getMasterRefri().subscribe(
      (res: RefriProduct[]) => {
        this.masterRefrigerator = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  loadTelevision() {
    this.tvService.getMasterTvs().subscribe(
      (res: TvProduct[]) => {
        this.masterTelevision = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  loadWashing() {
    this.washService.getMasterWashings().subscribe(
      (res: WashProduct[]) => {
        this.masterWashingMachine = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }

  addAirToCart(data) {
    if (this.authService.isLogin()) {
      console.log('34567890-=');
      console.log('<----- Select this item ----->', data);
      this.cartDataService.changeAirProduct(data);
    } else {
      this.router.navigate(['login']);
    }
  }
  addFanToCart(data) {
    if (this.authService.isLogin()) {
      console.log('34567890-=');
      console.log('<----- Select this item ----->', data);
      this.cartDataService.changeFanProduct(data);
    } else {
      this.router.navigate(['login']);
    }
  }
  addDishToCart(data) {
    if (this.authService.isLogin()) {
      console.log('34567890-=');
      console.log('<----- Select this item ----->', data);
      this.cartDataService.changeDishProduct(data);
    } else {
      this.router.navigate(['login']);
    }
  }
  addRefriToCart(data) {
    if (this.authService.isLogin()) {
      console.log('34567890-=');
      console.log('<----- Select this item ----->', data);
      this.cartDataService.changeRefriProduct(data);
    } else {
      this.router.navigate(['login']);
    }
  }
  addTvToCart(data) {
    if (this.authService.isLogin()) {
      console.log('34567890-=');
      console.log('<----- Select this item ----->', data);
      this.cartDataService.changeTvProduct(data);
    } else {
      this.router.navigate(['login']);
    }
  }
  addWashToCart(data) {
    if (this.authService.isLogin()) {
      console.log('34567890-=');
      console.log('<----- Select this item ----->', data);
      this.cartDataService.changeWashProduct(data);
    } else {
      this.router.navigate(['login']);
    }
  }
  addOtherToCart(data) {
    if (this.authService.isLogin()) {
      console.log('34567890-=');
      console.log('<----- Select this item ----->', data);
      this.cartDataService.changeOtherProduct(data);
    } else {
      this.router.navigate(['login']);
    }
  }
}
