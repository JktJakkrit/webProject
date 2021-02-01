import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { MasterService } from "src/app/_services/master.service";
import { ModalService } from "src/app/_services/modal.service";

import Swal from "sweetalert2";
@Component({
  selector: 'app-manage-refri',
  templateUrl: './manage-refri.component.html',
  styleUrls: ['./manage-refri.component.css']
})
export class ManageRefriComponent implements OnInit {
  photo: File;
  edit_refri_form: FormGroup;
  add_refri_form: FormGroup;

  imageSrc: string;

  Capa = [
    { id: 1, code: 'CUB01', title: '0 - 6 Cubic' },
    { id: 2, code: 'CUB02', title: '6.1-12 Cubic' },
    { id: 3, code: 'CUB03', title: '12.1 - 21 Cubic' },
    { id: 4, code: 'CUB04', title: '21.1 - 99 Cubic' },
    { id: 5, code: 'CUB00', title: 'อื่นๆ' },
  ];

  Type = [
    { id: 1, code: 'REF01', title: 'ตู้เย็น 2 ประตู' },
    { id: 2, code: 'REF02', title: 'ตู้เย็น 1 ประตู' },
    { id: 3, code: 'REF03', title: 'ตู้เย็นมัลติดอร์' },
    { id: 4, code: 'REF04', title: 'ตู้เย็นไซด์-บาย-ไซด์' },
    { id: 5, code: 'REF00', title: 'อื่นๆ' },
  ];

  productID = {
    type: '',
    capa: '',
  };

  select(type, _$event) {
    if (type == 'type') {
      this.productID.type = _$event.target.value;
    } else {
      this.productID.capa = _$event.target.value;
    }
    var ICODE =
      this.productID.type +
      '-' +
      this.productID.capa +
      '-' +
      (Math.floor(Math.random() * 9999) + 1);
    (<HTMLInputElement>document.getElementById('code')).value = ICODE;

    this.add_refri_form.patchValue({ code: ICODE });
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService,
    private http: HttpClient
  ) {
    this.add_refri_form = this.formBuilder.group({
      type: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    capa: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    price: new FormControl("", [
      Validators.required,
      Validators.min(1),
      Validators.max(100000),
    ]),
      avatar: ['', Validators.required],
    });

    this.edit_refri_form = this.formBuilder.group({
      refri_sys_id: ["", Validators.required],
      type: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
     
      capa: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      price: new FormControl("", [
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

  masterRefri;

  ngOnInit(): void { this.loadDataMaster();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  dishOnSubmit(form: any) {
    if (!this.add_refri_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.masterService
        .addMasterRefri( 
        form.value.type,
        form.value.code,
        form.value.name,
        form.value.brand,
        form.value.capa,
        form.value.detail,
        form.value.amount,
        form.value.price,
        this.photo
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'Refrigerator added successful.', 'success');
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
    if (!this.edit_refri_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.masterService
        .updateMasterRefri(
          form.value.refri_sys_id,
          form.value.type,
        form.value.code,
        form.value.name,
        form.value.brand,
        form.value.capa,
        form.value.detail,
        form.value.amount,
        form.value.price,
          this.photo,
          form.value.isvoid
        )

        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'Refrigerator edited successful.', 'success');
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
    this.edit_refri_form.controls['refri_sys_id'].setValue(trdata.refri_sys_id);
    this.edit_refri_form.controls['name'].setValue(trdata.name);
    this.edit_refri_form.controls['code'].setValue(trdata.code);
    this.edit_refri_form.controls['brand'].setValue(trdata.brand);
    this.edit_refri_form.controls['type'].setValue(trdata.type);
    this.edit_refri_form.controls['detail'].setValue(trdata.detail);
    this.edit_refri_form.controls['capa'].setValue(trdata.capa);
    this.edit_refri_form.controls['price'].setValue(trdata.price);
    this.edit_refri_form.controls['amount'].setValue(trdata.amount);
    this.edit_refri_form.controls['avatar'].setValue(trdata.avatar);
    this.edit_refri_form.controls['isvoid'].setValue(
      trdata.isvoid.toString()
    );

    this.modalService.open('modal_editcate');
  }

  loadDataMaster() {
    this.masterService.getMasterRefri().subscribe(
      (res: any) => {
        this.masterRefri = res;
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

          this.add_refri_form.patchValue({
            fileSource: reader.result,
          });
        };
      }
    } catch (e) {}
  }

  deleteProduct(){
    console.log("............");
    // this.httpClient.delete(this.url + endPoints).subscribe(data => {
    //   console.log(data);
    // });
    
  }

}