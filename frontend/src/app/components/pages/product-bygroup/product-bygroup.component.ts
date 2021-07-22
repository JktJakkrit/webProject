import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { MasterService } from 'src/app/_services/master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-bygroup',
  templateUrl: './product-bygroup.component.html',
  styleUrls: ['./product-bygroup.component.css'],
})
export class ProductBygroupComponent implements OnInit, OnDestroy {
  loadProductByG;
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
      this.loadProductByGroup();
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadProductByGroup() {
    this.masterService.loadProductByGroupId(this.id).subscribe(
      (res: any) => {
        console.log('Group list => ' + res);
        console.log(res);

        this.loadProductByG = res;
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
