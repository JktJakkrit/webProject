import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ProductModelServer,
  serverResponse,
} from 'src/app/models/product.model';
import { AuthService } from 'src/app/_services/auth.service';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { MasterService } from 'src/app/_services/master.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  languages = ['Angular 10', 'React', 'Node Js', 'Spring boot'];

  languageHasError = true;

  Category;
  masterProduct;

  constructor(
    private masterService: MasterService,
    private cartDataService: CartDataServiceService,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit() {
    this.loadCategoryList();
    this.loadProduct();
  }

  loadCategoryList() {
    this.masterService.loadCategory().subscribe(
      (res: any) => {
        console.log(res);

        this.Category = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }

  loadProduct() {
    this.masterService.getMasterProduct().subscribe(
      (res: any) => {
        this.masterProduct = res;
      },
      (error) => {
        console.log("error" + error.status);
      }
    );
  }

  addToCart(data) {
    if (this.authService.isLogin()) {
      console.log('34567890-=');
      console.log('<----- Select this item ----->', data);
      this.cartDataService.changeProductAll(data);
    } else {
      this.router.navigate(['login']);
    }
    // this.cartDataService.AddProductToCart(data);
  }


}
