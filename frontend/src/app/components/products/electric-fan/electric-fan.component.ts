import { CartDataServiceService } from './../../../_services/cart-data-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/_services/master.service';
import { ModalService } from 'src/app/_services/modal.service';
import Swal from 'sweetalert2';
import { FanProduct } from 'src/app/models/fan.model';
@Component({
  selector: 'app-electric-fan',
  templateUrl: './electric-fan.component.html',
  styleUrls: ['./electric-fan.component.css']
})
export class ElectricFanComponent implements OnInit {

  masterFans: FanProduct[];
  constructor( private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService,
    private cartDataService: CartDataServiceService) { }

  ngOnInit(): void {
    this.loadElectricFan();
  }
  loadElectricFan() {
    this.masterService. getMasterFans().subscribe(
      (res: FanProduct[]) => {
        this.masterFans = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  addToCart(data) {
    console.log("34567890-=");
    // this.cartDataService.changeAirProduct(data);
  }
}