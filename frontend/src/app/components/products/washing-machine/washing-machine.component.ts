import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WashProduct } from 'src/app/models/wash.model';
import { AuthService } from 'src/app/_services/auth.service';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { ModalService } from 'src/app/_services/modal.service';
import { WashService } from 'src/app/_services/wash.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-washing-machine',
  templateUrl: './washing-machine.component.html',
  styleUrls: ['./washing-machine.component.css'],
})
export class WashingMachineComponent implements OnInit {
  masterWashingMachine: WashProduct[];
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,

    private cartDataService: CartDataServiceService,
    private washService: WashService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadWashing();
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

  addToCart(data) {
    if (this.authService.isLogin()) {
      console.log('34567890-=');
      console.log('<----- Select this item ----->', data);
      this.cartDataService.changeWashProduct(data);
    } else {
      this.router.navigate(['login']);
    }
  }
}
