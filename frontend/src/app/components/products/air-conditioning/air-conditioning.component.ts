import { CartService } from 'src/app/_services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/_services/master.service';
import { ModalService } from 'src/app/_services/modal.service';

import Swal from 'sweetalert2';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { AirProduct } from 'src/app/models/air.model';
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
    private masterService: MasterService,
    private cartDataService: CartDataServiceService
  ) {}

  ngOnInit(): void {
    this.loadAirCondition();
  }
  loadAirCondition() {
    this.masterService.getMasterAirs().subscribe(
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
    console.log("34567890-=");
    this.cartDataService.changeAirProduct(data);
  }
}
