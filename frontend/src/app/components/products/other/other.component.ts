import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OtherProduct } from 'src/app/models/other.model';
import { AuthService } from 'src/app/_services/auth.service';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { OtherService } from 'src/app/_services/other.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css'],
})
export class OtherComponent implements OnInit {
  masterOther: OtherProduct[];
  constructor(
    private otherService: OtherService,
    private cartDataService: CartDataServiceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOther();
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

  addToCart(data) {
    if (this.authService.isLogin()) {
      console.log('34567890-=');
      console.log('<----- Select this item ----->', data);
      this.cartDataService.changeOtherProduct(data);
    } else {
      this.router.navigate(['login']);
    }
  }
}
