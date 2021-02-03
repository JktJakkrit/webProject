import { CartDataServiceService } from './../../../_services/cart-data-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ModalService } from 'src/app/_services/modal.service';
import Swal from 'sweetalert2';
import { RefriProduct } from 'src/app/models/refri.model';
import { RefriService } from 'src/app/_services/refri.service';
@Component({
  selector: 'app-refrigerator',
  templateUrl: './refrigerator.component.html',
  styleUrls: ['./refrigerator.component.css']
})
export class RefrigeratorComponent implements OnInit {

  masterRefrigerator: RefriProduct[];
  constructor( private formBuilder: FormBuilder,
    private modalService: ModalService,
   
    private cartDataService: CartDataServiceService,
    private refriService: RefriService) { }

  ngOnInit(): void {
    this.loadRefrigerator();
  }
  loadRefrigerator() {
    this.refriService. getMasterRefri().subscribe(
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
    this.cartDataService.changeRefriProduct(data);
    // this.cartDataService.AddProductToCart(data);
  }
}