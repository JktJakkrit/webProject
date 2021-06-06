import { FanProduct } from './../../../models/fan.model';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AirProduct } from 'src/app/models/air.model';
import { DishProduct } from 'src/app/models/dish.model';
import { RefriProduct } from 'src/app/models/refri.model';
import { TvProduct } from 'src/app/models/tv.model';
import { WashProduct } from 'src/app/models/wash.model';
import { OtherProduct } from 'src/app/models/other.model';
import Swal from 'sweetalert2';
declare var jsPDF: any;
// import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { RegisterService } from 'src/app/_services/register.service';
import { DataUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/_services/user.service';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import { ProductsAll } from 'src/app/models/product.model';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  success_form: FormGroup;
 
  countProduct: ProductsAll[] = [];
  userData: DataUser;
  currentDate = new Date();
  codeReceipt = this.makeid();


  downloadAsPDF() {
    var element = document.getElementById('pdfTable');

    html2canvas(element).then((canvas) => {
      console.log(canvas);
      const ta = document.getElementById('pdfTable');
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();

      var imgHeight = canvas.height * 208 / canvas.width;
      // doc.fromHTML(ta, 15, 15);
      //(ข้อมูล, ชอบซ้าย, บน ,.....)
      doc.addImage(imgData, 1, 20, 208, imgHeight)
      doc.save('image.pdf');
    });
  }

  
  makeid() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  public get counter() {
    var counters: number = 0;
    
    counters += this.countProduct.length || 0;
    // counters += this.countProduct.length || 0;
    return counters;
  }

  constructor(
    private formBuilder: FormBuilder,
    private cartDataService: CartDataServiceService,
    private registerService: RegisterService,
    private userService: UserService,
    private exportAsService: ExportAsService,
    private router: Router
  ) {

    this.cartDataService.currentProductsAll.subscribe((data) => {
      if (data) {
        this.countProduct = data;
      }
    });

  }



  loadUser(event) {
    this.userService.changeDataUser(event.target.value);
  }

  ngOnInit(): void {
    this.userService.currentDataUser.subscribe((data) => {
      if (data) {
        console.log('<---success---', data);

        this.userData = data;
      }
    });
  }


  

  TotalProductPrice(count, price) : number {
    return count * price;
  }

  ProductChangeAmount(event,ProductItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountProductAll(ProductItem,event.target.value);
    this.calTotalAll().toFixed(2);
    this.calTotalVAT7all().toFixed(2)
  }

  removeItem(item) {
    this.cartDataService.removeProductItem(item);
  }

  
calTotalAll(){
  const callBack = (sum, curr) => sum + (curr.price * curr.count);

  const sum = !!this.countProduct.length ? this.countProduct.reduce(callBack, 0) : 0;

  // return sum + (sum * 0.07) + (sum * 0.93);
  return sum + (sum * 0.07);
}
calTotalVAT7all() {
  const callBack = (sum, curr) => sum + (curr.price * curr.count);

  const sum = !!this.countProduct.length ? this.countProduct.reduce(callBack, 0) : 0;

  // return sum + (sum * 0.07) + (sum * 0.93);
  return sum * 0.07;
}

//-----------------------------

}
