import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { MasterService } from 'src/app/_services/master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.css']
})
export class AllproductComponent implements OnInit, OnDestroy {
  loadProduct;
  id: number;
  private sub: any;

  constructor(
    private masterService: MasterService,
    private route: ActivatedRoute,
    private cartDataService: CartDataServiceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      console.log(this.id);
      this.loadProductAll();
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadProductAll() {
    this.masterService.loadProducts().subscribe(
      (res: any) => {
        console.log('Group list => ' + res);
        console.log(res);

        this.loadProduct = res;
      },
      (error) => {
        console.log('bygroup')
        Swal.fire('Error!', 'error : ' + error.status, 'error');
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
