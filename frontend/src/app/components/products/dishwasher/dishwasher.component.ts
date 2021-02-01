import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DishProduct } from 'src/app/models/dish.model';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { MasterService } from 'src/app/_services/master.service';
import { ModalService } from 'src/app/_services/modal.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dishwasher',
  templateUrl: './dishwasher.component.html',
  styleUrls: ['./dishwasher.component.css']
})
export class DishwasherComponent implements OnInit {

  masterDishwasher: DishProduct[];
  constructor( private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService,
    private cartDataService: CartDataServiceService) { }

  ngOnInit(): void {
    this.loadDishwasher();
  }
  loadDishwasher() {
    this.masterService. getMasterDishs().subscribe(
      (res: DishProduct[]) => {
        this.masterDishwasher = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  addToCart(data) {
    console.log("34567890-=");
    this.cartDataService.changeDishProduct(data);
  }
}