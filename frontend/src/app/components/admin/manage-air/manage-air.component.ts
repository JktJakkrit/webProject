import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MasterService } from 'src/app/_services/master.service';
import { ModalService } from 'src/app/_services/modal.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-manage-air',
  templateUrl: './manage-air.component.html',
  styleUrls: ['./manage-air.component.css'],
})
export class ManageAirComponent implements OnInit {
  edit_air_form: FormGroup;
  add_air_form: FormGroup;
  photo: File;

  imageSrc: string;
  private url = environment.serverURL;

  productType = [
    { id: 1, code: 'AIR01', title: 'แบบติดผนัง' },
    { id: 2, code: 'AIR02', title: 'อุปกรณ์เสริมเครื่องปรับอากาศ' },
    { id: 3, code: 'AIR03', title: 'แบบเคลื่อนที่' },
    { id: 4, code: 'AIR00', title: 'อื่นๆ' },
  ];

  productBtu = [
    { id: 1, code: 'BTU01', title: '0 - 12000 BTU' },
    { id: 2, code: 'BTU02', title: '18000 - 23999 BTU' },
    { id: 3, code: 'BTU03', title: '12001 - 14999 BTU' },
    { id: 4, code: 'BTU04', title: '24000 - 50000 BTU' },
    { id: 5, code: 'BTU00', title: 'อื่นๆ' },
  ];

  productRoom = [
    { id: 1, code: 'R01', title: '11 - 14 SQM' },
    { id: 2, code: 'R02', title: '14.1 - 18 SQM' },
    { id: 3, code: 'R03', title: '18.1- 28 SQM' },
    { id: 4, code: 'R04', title: '28.1 - 35 SQM' },
    { id: 5, code: 'R00', title: 'อื่นๆ' },
  ];

  productID = {
    type: '',
    btu: '',
  };

  select(type,_$event) {
    if (type == 'type') {
      this.productID.type = _$event.target.value;
    } else {
      this.productID.btu = _$event.target.value;
    }
    var ICODE =
      this.productID.type +
      '-' +
      this.productID.btu +
      '-' +
      (Math.floor(Math.random() * 9999) + 1);
    (<HTMLInputElement>document.getElementById('code')).value = ICODE;

    this.add_air_form.patchValue({ code: ICODE });
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService,
    private http: HttpClient
  ) {
    this.add_air_form = this.formBuilder.group({
      type: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      btu: new FormControl('', [Validators.required]),
      room: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(100000),
      ]),
      avatar: ['', Validators.required],
    });

    this.edit_air_form = this.formBuilder.group({
      air_sys_id: ['', Validators.required],
      type: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      btu: new FormControl('', [Validators.required]),
      room: new FormControl('', [Validators.required]),
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

  masterAir;

  ngOnInit(): void {
    this.loadDataMaster();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  airOnSubmit(form: any) {
    console.log(this.add_air_form);

    if (!this.add_air_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.masterService
        .addMasterAirs(
          form.value.type,
          form.value.code,
          form.value.name,
          form.value.brand,
          form.value.btu,
          form.value.room,
          form.value.detail,
          form.value.price,
          form.value.amount,
          this.photo
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'Air added successful.', 'success');
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

  airEditOnSubmit(form: any) {
    if (!this.edit_air_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.masterService
        .updateMasterAirs(
          form.value.air_sys_id,
          form.value.type,
          form.value.code,
          form.value.name,
          form.value.brand,
          form.value.btu,
          form.value.room,
          form.value.detail,
          form.value.price,
          form.value.amount,
          this.photo,
          form.value.isvoid
        )

        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'Air edited successful.', 'success');
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
    this.edit_air_form.controls['air_sys_id'].setValue(trdata.air_sys_id);
    this.edit_air_form.controls['name'].setValue(trdata.name);
    this.edit_air_form.controls['code'].setValue(trdata.code);
    this.edit_air_form.controls['btu'].setValue(trdata.btu);
    this.edit_air_form.controls['room'].setValue(trdata.room);
    this.edit_air_form.controls['brand'].setValue(trdata.brand);
    this.edit_air_form.controls['type'].setValue(trdata.type);
    this.edit_air_form.controls['detail'].setValue(trdata.detail);
    this.edit_air_form.controls['price'].setValue(trdata.price);
    this.edit_air_form.controls['amount'].setValue(trdata.amount);
    this.edit_air_form.controls['avatar'].setValue(trdata.avatar);
    this.edit_air_form.controls['isvoid'].setValue(trdata.isvoid.toString());

    this.modalService.open('modal_editcate');
  }

  loadDataMaster() {
    this.masterService.getMasterAirs().subscribe(
      (res: any) => {
        this.masterAir = res;
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

          this.add_air_form.patchValue({
            fileSource: reader.result,
          });
        };
      }
    } catch (e) {}
  }
  
  deleteProduct(air_sys_id){
    console.log("............");
    // this.http.delete(this.url + '/air/' + air_sys_id).subscribe(data => {
    //   console.log(data);
    // });
    
  }
}
