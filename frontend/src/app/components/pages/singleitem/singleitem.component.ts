import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsAll } from 'src/app/models/product.model';
import { AuthService } from 'src/app/_services/auth.service';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { MasterService } from 'src/app/_services/master.service';

@Component({
  selector: 'app-singleitem',
  templateUrl: './singleitem.component.html',
  styleUrls: ['./singleitem.component.css'],
})
export class SingleitemComponent implements OnInit, OnDestroy {
  masterProduct;
  loadSome;
  id: number;
  name: string;
  private sub: any;
  countProduct: ProductsAll[] = [];

  totalPriceAllProduct: number = 0;
  
  constructor(
    private masterService: MasterService,
    private route: ActivatedRoute,
    private cartDataService: CartDataServiceService,
    private router: Router,
    private authService: AuthService
  ) {

    this.cartDataService.currentProductsAll.subscribe((data) => {
      if (data) {
        this.countProduct = data;
      }
    });
    
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      
      console.log(this.id);
      this.loadById()
      // In a real app: dispatch action to load the details here.
    });

    this.loadProduct();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadProduct() {
    this.masterService.getMasterProduct().subscribe(
      (res: any) => {
        this.masterProduct = res;
      },
      (error) => {
        console.log('error' + error.status);
      }
    );
  }

  loadById(){
    this.masterService.loadProductById(this.id).subscribe(
      (res: any) => {
        this.loadSome = res;
        console.log(res);
        
      },
      (error) => {
        console.log('error' + error.status);
      }
    )
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

  ProductChangeAmount(event, ProductItem) {
    console.log(event.target.value);
    this.cartDataService.updateAmountProductAll(
      ProductItem,
      event.target.value
    );
    this.calTotalAll().toFixed(2);
    this.calTotalVAT7all().toFixed(2);
  }
  calTotalAll() {
    const callBack = (sum, curr) => sum + curr.price * curr.count;

    const sum = !!this.countProduct.length
      ? this.countProduct.reduce(callBack, 0)
      : 0;

    // return sum + (sum * 0.07) + (sum * 0.93);
    return sum + sum * 0.07;
  }
  calTotalVAT7all() {
    const callBack = (sum, curr) => sum + curr.price * curr.count;

    const sum = !!this.countProduct.length
      ? this.countProduct.reduce(callBack, 0)
      : 0;

    // return sum + (sum * 0.07) + (sum * 0.93);
    return sum * 0.07;
  }

  // goToProductDetails(id) {
  //   this.router.navigate(['/product-details', id]);
  // }

}
