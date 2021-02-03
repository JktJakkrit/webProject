import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-other',
  templateUrl: './manage-other.component.html',
  styleUrls: ['./manage-other.component.css']
})
export class ManageOtherComponent implements OnInit {
add_other_form: FormGroup;
edir_other_form: FormGroup;
  constructor() { 

  //   this.add_other_form = this.formBuilder.group({
  //     other_sys_id: ['', Validators.required],
  //     type: ['', Validators.required],
  //     code: ['', Validators.required],
  //     name: ['', Validators.required],
  //     brand: ['', Validators.required],
  //     detail: ['', Validators.required],
  //     amount: ['', Validators.required],
  //     price: ['', Validators.required],
  //     file: ['', Validators.required],
  //     });
  }

  ngOnInit(): void {
  }

}
