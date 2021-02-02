import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterService } from 'src/app/_services/master.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkout_form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService
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
  }
  mastercheckout;

  ngOnInit() {}

  onSubmit(form: any) {
    console.log(this.checkout_form);

    if (!this.checkout_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.masterService
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
