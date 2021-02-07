import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DishProduct } from 'src/app/models/dish.model';
import { AuthService } from 'src/app/_services/auth.service';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { DishService } from 'src/app/_services/dish.service';

import { ModalService } from 'src/app/_services/modal.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dishwasher',
  templateUrl: './dishwasher.component.html',
  styleUrls: ['./dishwasher.component.css'],
})
export class DishwasherComponent implements OnInit {
  masterDishwasher: DishProduct[];
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,

    private cartDataService: CartDataServiceService,
    private dishService: DishService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDishwasher();
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

  addToCart(data) {
    if (this.authService.isLogin()) {
      console.log('34567890-=');
      console.log('<----- Select this item ----->', data);
      this.cartDataService.changeDishProduct(data);
    } else {
      this.router.navigate(['login']);
    }
    // this.cartDataService.AddProductToCart(data);
  }
}
