import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FanService } from 'src/app/_services/fan.service';

import { ModalService } from 'src/app/_services/modal.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-manage-fan',
  templateUrl: './manage-fan.component.html',
  styleUrls: ['./manage-fan.component.css'],
})
export class ManageFanComponent implements OnInit {
  photo: File;
  edit_fan_form: FormGroup;
  add_fan_form: FormGroup;
  deleteFan;
  imageSrc: string;

  productType = [
    { id: 1, code: 'FAN01', title: 'พัดลมตั้งโต๊ะ' },
    { id: 2, code: 'FAN02', title: 'พัดลมตั้งพื้น' },
    { id: 3, code: 'FAN03', title: 'พัดลมไอน้ำ' },
    { id: 4, code: 'FAN00', title: 'อื่นๆ' },
  ];

  productSize = [
    { id: 1, code: 'S12', title: '12 inches' },
    { id: 2, code: 'S14', title: '14 inches' },
    { id: 3, code: 'S16', title: '16 inches' },
    { id: 4, code: 'S18', title: '18 inches' },
    { id: 5, code: 'S00', title: 'Other' },
  ];

  productID = {
    type: '',
    size: '',
  };

  select(type, _$event) {
    if (type == 'type') {
      this.productID.type = _$event.target.value;
    } else {
      this.productID.size = _$event.target.value;
    }
    var ICODE =
      this.productID.type +
      '-' +
      this.productID.size +
      '-' +
      (Math.floor(Math.random() * 9999) + 1);

    (<HTMLInputElement>document.getElementById('code')).value = ICODE;
    this.add_fan_form.patchValue({ code: ICODE });
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,

    private http: HttpClient,
    private fanService: FanService
  ) {
    this.add_fan_form = this.formBuilder.group({
      type: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(100000),
      ]),
      avatar: ['', Validators.required],
    });

    this.edit_fan_form = this.formBuilder.group({
      fan_sys_id: ['', Validators.required],
      type: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(100000),
      ]),
      avatar: ['', Validators.required],
      isvoid: 0,
    });
  }
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  isDtInitialized: boolean = false;

  masterFans;

  ngOnInit(): void {
    this.loadDataMaster();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  dishOnSubmit(form: any) {
    if (!this.add_fan_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.fanService
        .addMasterFan(
          form.value.type,
          form.value.code,
          form.value.name,
          form.value.brand,
          form.value.size,
          form.value.detail,
          form.value.amount,
          form.value.price,
          this.photo
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'Fan added successful.', 'success');
          },
          (error) => {
            if (error.status === 200 || error.status === 201) {
              Swal.fire('Error!', 'error : ' + error.status, 'error');
              this.closeModal('modal_addcate');
              this.loadDataMaster();
            } else {
              console.log(error.status);
              Swal.fire('Error!', 'error : ' + error.status, 'error');
            }
          }
        );
    }
  }

  dishEditOnSubmit(form: any) {
    if (!this.edit_fan_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.fanService
        .updateMasterFan(
          form.value.fan_sys_id,
          form.value.type,
          form.value.code,
          form.value.name,
          form.value.brand,
          form.value.detail,
          form.value.price,
          form.value.size,
          form.value.amount,
          this.photo,
          form.value.isvoid
        )

        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'Fan edited successful.', 'success');
          },
          (error) => {
            if (error.status === 200 || error.status === 201) {
              Swal.fire('Error!', 'error : ' + error.status, 'error');
              this.closeModal('modal_editcate');
              this.loadDataMaster();
            } else {
              console.log(error.status);
              Swal.fire('Error!', 'error : ' + error.status, 'error');
            }
          }
        );
    }
  }

  editcate(trdata) {
    this.edit_fan_form.controls['fan_sys_id'].setValue(trdata.fan_sys_id);
    this.edit_fan_form.controls['name'].setValue(trdata.name);
    this.edit_fan_form.controls['code'].setValue(trdata.code);

    this.edit_fan_form.controls['type'].setValue(trdata.type);
    this.edit_fan_form.controls['size'].setValue(trdata.size);
    this.edit_fan_form.controls['detail'].setValue(trdata.detail);
    this.edit_fan_form.controls['brand'].setValue(trdata.brand);
    this.edit_fan_form.controls['amount'].setValue(trdata.amount);
    this.edit_fan_form.controls['price'].setValue(trdata.price);

    this.edit_fan_form.controls['avatar'].setValue(trdata.avatar);
    this.edit_fan_form.controls['isvoid'].setValue(trdata.isvoid.toString());

    this.modalService.open('modal_editcate');
  }

  loadDataMaster() {
    this.fanService.getMasterFans().subscribe(
      (res: any) => {
        this.masterFans = res;
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
        // Swal.fire('Successful!', 'Load Building successful.', 'success');
      },

      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
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

          this.add_fan_form.patchValue({
            fileSource: reader.result,
          });
        };
      }
    } catch (e) {}
  }

  setDeleteFan(fan) {
    this.deleteFan = fan;
  }
  deleteFanSubmit() {
    console.log(this.deleteFan);
    this.fanService.deleteFan(this.deleteFan.fan_sys_id).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire('Successful!', 'Delete successful.', 'success');
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          Swal.fire('Successful!', 'Delete successful.', 'success');
          this.closeModal('modal_delete');
        } else {
          console.log(error.status);
          Swal.fire('Error!', 'error : ' + error.status, 'error');
        }
      }
    );
  }
}
