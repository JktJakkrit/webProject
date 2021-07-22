
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
declare var jsPDF: any;
// import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { RegisterService } from 'src/app/_services/register.service';
import { DataUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/_services/user.service';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import { ProductsAll } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { CheckoutService } from 'src/app/_services/checkout.service';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  success_form: FormGroup;
  file_form:FormGroup;
  countProduct: ProductsAll[] = [];
  userData: DataUser;
  currentDate = new Date();
  codeReceipt = this.makeid();
  private url = environment.serverURL;
  photo: File;
  imageSrc: string;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
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
    private router: Router,
    private http: HttpClient,
    private checkoutService: CheckoutService,
  ) {

    this.cartDataService.currentProductsAll.subscribe((data) => {
      if (data) {
        this.countProduct = data;
      }
    });


    this.file_form = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      avatar: ["", Validators.required],
     
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

OnSubmit(form: any) {
  console.log(this.file_form);
  // console.log( this.photo);
  

  if (!this.file_form.valid) {
    Swal.fire("Input Valid!", "Please enter require input", "info");
  } else {
    this.checkoutService
      .upload(
        form.value.name,
        this.photo
      )
      .subscribe(
        (res: any) => {
          console.log(" data file ==> ", res);
          Swal.fire("Successful!", "added successful.", "success");
        },
        (error) => {
          if (error.status === 200 || error.status === 201) {
            Swal.fire("Error!", "error : " + error.status, "error");
          } else {
            console.log(error.status);
            Swal.fire("Error!", "error : " + error.status, "error");
          }
        }
      );
  }
}

onFileChange(event) {
  try {
    var file = event.target.files[0];
    console.log(file);
    this.photo = file;
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [avatar] = event.target.files;
      // this.add_air_form.setValue({avatar : avatar})

      reader.readAsDataURL(avatar);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.file_form.patchValue({
          fileSource: reader.result,
        });
      };
    }
  } catch (e) {}
}

}
