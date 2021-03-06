import { CartDataServiceService } from './../../../_services/cart-data-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalService } from 'src/app/_services/modal.service';
import Swal from 'sweetalert2';
import { TvProduct } from 'src/app/models/tv.model';
import { TvService } from 'src/app/_services/tv.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-television',
  templateUrl: './television.component.html',
  styleUrls: ['./television.component.css'],
})
export class TelevisionComponent implements OnInit {
  masterTelevision: TvProduct[];
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,

    private cartDataService: CartDataServiceService,
    private tvService: TvService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTelevision();
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

  addToCart(data) {
    if (this.authService.isLogin()) {
      console.log('34567890-=');
      console.log('<----- Select this item ----->', data);
      this.cartDataService.changeTvProduct(data);
    } else {
      this.router.navigate(['login']);
    }
  }
}
