import { CartDataServiceService } from './../../../_services/cart-data-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/_services/master.service';
import { ModalService } from 'src/app/_services/modal.service';
import Swal from 'sweetalert2';
import { RefriProduct } from 'src/app/models/refri.model';
@Component({
  selector: 'app-refrigerator',
  templateUrl: './refrigerator.component.html',
  styleUrls: ['./refrigerator.component.css']
})
export class RefrigeratorComponent implements OnInit {

  masterRefrigerator: RefriProduct[];
  constructor( private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService,
    private cartDataService: CartDataServiceService) { }

  ngOnInit(): void {
    this.loadRefrigerator();
  }
  loadRefrigerator() {
    this.masterService. getMasterRefri().subscribe(
      (res: RefriProduct[]) => {
        this.masterRefrigerator = res;
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