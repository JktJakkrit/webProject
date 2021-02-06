import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';

import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { AirProduct } from 'src/app/models/air.model';
import { DishProduct } from 'src/app/models/dish.model';
import { FanProduct } from 'src/app/models/fan.model';
import { RefriProduct } from 'src/app/models/refri.model';
import { TvProduct } from 'src/app/models/tv.model';
import { WashProduct } from 'src/app/models/wash.model';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
import { CheckoutService } from 'src/app/_services/checkout.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs; 
import { DataUser, DataProduct } from 'src/app/models/checkout.model';
import { OtherProduct } from 'src/app/models/other.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkout_form: FormGroup;
  countAir: AirProduct[] = [];
  countDish: DishProduct[] = [];
  countFan: FanProduct[] = [];
  countRefri: RefriProduct[] = [];
  countTv: TvProduct[] = [];
  countWash: WashProduct[] = [];
countOther: OtherProduct[] = [];
  
  public get counter() {
    var counters: number = 0;
    counters += this.countAir.length || 0;
    counters += this.countDish.length || 0;
    counters += this.countFan.length || 0;
    counters += this.countRefri.length || 0;
    counters += this.countTv.length || 0;
    counters += this.countWash.length || 0;
    counters += this.countOther.length || 0;
    // counters += this.countProduct.length || 0;
    return counters;
  }

  dataUser = new DataUser();
  degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];
  constructor(
    private formBuilder: FormBuilder,
    private cartDataService: CartDataServiceService,
    private checkoutService: CheckoutService
  ) {
    this.checkout_form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      card: new FormControl('', [Validators.required]),
      number_card: new FormControl('', [Validators.required]),
      expMonth: new FormControl('', [Validators.required]),
      expYear: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required]),
    });

    this.cartDataService.currentAirProduct.subscribe((data) => {
      if (data) {
        this.countAir = data;
      }
    });

    this.cartDataService.currentDishProduct.subscribe((data) => {
      if (data) {
        this.countDish = data;
      }
    });

    this.cartDataService.currentFanProduct.subscribe((data) => {
      if (data) {
        this.countFan = data;
      }
    });

    this.cartDataService.currentRefriProduct.subscribe((data) => {
      if (data) {
        this.countRefri = data;
      }
    });

    this.cartDataService.currentTvProduct.subscribe((data) => {
      if (data) {
        this.countTv = data;
      }
    });

    this.cartDataService.currentWashProduct.subscribe((data) => {
      if (data) {
        this.countWash = data;
      }
    });

    this.cartDataService.currentOtherProduct.subscribe((data) =>{
      if(data){
        this.countOther = data;
      }
    })

    this.dataUser = JSON.parse(sessionStorage.getItem('resume')) || new DataUser();
    if (!this.dataUser.dataProduct || this.dataUser.dataProduct.length === 0) {
      this.dataUser.dataProduct = [];
      this.dataUser.dataProduct.push(new DataProduct());
    }

  }
  mastercheckout;
  addExperience() {
    this.dataUser.dataProduct.push(new DataProduct());
  }
  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }
  resetForm() {
    this.dataUser = new DataUser();
  }
  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.dataUser));
    return {
      content: [
        {
          text: 'RECEIPT',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.dataUser.name,
              style: 'name'
            },
            {
              text: this.dataUser.address
            },
            {
              text: 'Email : ' + this.dataUser.email,
            },
            {
              text: 'City : ' + this.dataUser.city,
            },
            {
              text: 'Phone No : ' + this.dataUser.phone,
            },
            
            ],
            
          ]
        },
        
        {
          text: 'Product',
          style: 'header'
        },
        this.getDataProductObject(this.dataUser.dataProduct),
       
        {
         
        }
      ],
      info: {
        title: this.dataUser.name + '_RESUME',
        author: this.dataUser.name,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }
  getDataProductObject(dataProduct: DataProduct[]) {
    const exs = [];
    dataProduct.forEach(dataProduct => {
      exs.push(
        [{
          columns: [
            [{
              text: dataProduct.name,
              style: 'jobTitle'
            },
            {
              text: dataProduct.amout,
            },
            {
              text: dataProduct.price,
            }
            ,
            {
              text: dataProduct.totalPrice,
            }
          ],
           
          ]
        }]
      );
    });
    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }
  
  

  
  ngOnInit() {}

  onSubmit(form: any) {
    console.log(this.checkout_form);

    if (!this.checkout_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.checkoutService
        .addCheckOut(
          form.value.name,
          form.value.email,
          form.value.address,
          form.value.city,
          form.value.phone,
          form.value.state,
          form.value.zip,
          form.value.card,
          form.value.number_card,
          form.value.expMonth,
          form.value.expYear,
          form.value.cvv
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'checkout successful.', 'success');
            this.generatePdf();
          },
          (error) => {
            if (error.status === 200 || error.status === 201) {
              Swal.fire('Error!', 'error : ' + error.status, 'error');

              // this.loadDataMaster();
            } else {
              console.log(error.status);
              Swal.fire('Error!', 'error : ' + error.status, 'error');
            }
          }
        );
    }
  }

 
  airTotalPrice(amount,price) : number {
    return amount * price;
  }
  airChangeAmount(event,airItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountAirProduct(airItem,event.target.value);
  }
//-----------------------------
  dishTotalPrice(amount,price) : number {
    return amount * price;
  }
  dishChangeAmount(event,dishItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountDishProduct(dishItem,event.target.value);
  }
  //-----------------------------
  fanTotalPrice(amount,price) : number {
    return amount * price;
  }
  fanChangeAmount(event,fanItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountFanProduct(fanItem,event.target.value);
  }
  //-----------------------------
  refriTotalPrice(amount,price) : number {
    return amount * price;
  }
  refriChangeAmount(event,refriItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountRefriProduct(refriItem,event.target.value);
  }
  //-----------------------------
  washTotalPrice(amount,price) : number {
    return amount * price;
  }
  washChangeAmount(event,washItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountWashProduct(washItem,event.target.value);
  }
  //-----------------------------
  tvTotalPrice(amount,price) : number {
    return amount * price;
  }
  tvChangeAmount(event,tvItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountTvProduct(tvItem,event.target.value);
  }
  //-----------------------------
  otherTotalPrice(amount,price) : number {
    return amount * price;
  }
  otherChangeAmount(event,otherItem) {
    console.log(event.target.value );
    this.cartDataService.updateAmountOtherProduct(otherItem,event.target.value);
  }




  
}
