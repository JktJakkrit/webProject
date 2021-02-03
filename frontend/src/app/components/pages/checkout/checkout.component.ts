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

  public get counter() {
    var counters: number = 0;
    counters += this.countAir.length || 0;
    counters += this.countDish.length || 0;
    counters += this.countFan.length || 0;
    counters += this.countRefri.length || 0;
    counters += this.countTv.length || 0;
    counters += this.countWash.length || 0;
    // counters += this.countProduct.length || 0;
    return counters;
  }
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


  }
  mastercheckout;

  // invoice = new Invoice(); 
  
  generatePDF() {
    let docDefinition = {
      content: [
        {
          text: 'ELECTRONIC SHOP',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            // [
            //   {
            //     text: this.invoice.customerName,
            //     bold:true
            //   },
            //   { text: this.invoice.address },
            //   { text: this.invoice.email },
            //   { text: this.invoice.contactNo }
            // ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              { 
                text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              // ...this.invoice.products.map(p => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
              // [{text: 'Total Amount', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)]
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
            // text: this.invoice.additionalDetails,
            margin: [0, 0 ,0, 15]          
        },
        {
          columns: [
            // [{ qr: `${this.invoice.customerName}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true}],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Order can be return in max 10 days.',
              'Warrenty of the product will be subject to the manufacturer terms and conditions.',
              'This is system generated invoice.',
            ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();  
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
            this.generatePDF();
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


  
}
