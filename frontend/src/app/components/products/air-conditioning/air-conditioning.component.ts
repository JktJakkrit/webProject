import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ModalService } from 'src/app/_services/modal.service';
import Swal from 'sweetalert2';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { AirProduct } from 'src/app/models/air.model';
import { AirService } from 'src/app/_services/air.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-air-conditioning',
  templateUrl: './air-conditioning.component.html',
  styleUrls: ['./air-conditioning.component.css'],
})
export class AirConditioningComponent implements OnInit {
  masterAir: AirProduct[];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private cartDataService: CartDataServiceService,
    private airService: AirService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAirCondition();
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

  addToCart(data) {
    if (this.authService.isLogin()) {
      console.log('34567890-=');
      console.log('<----- Select this item ----->', data);
      this.cartDataService.changeAirProduct(data);
    } else {
      this.router.navigate(['login']);
    }
    // this.cartDataService.AddProductToCart(data);
  }
}
