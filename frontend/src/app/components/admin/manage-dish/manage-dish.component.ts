import { HttpClient } from "@angular/common/http";
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
  selector: 'app-manage-dish',
  templateUrl: './manage-dish.component.html',
  styleUrls: ['./manage-dish.component.css']
})
export class ManageDishComponent implements OnInit {
  photo: File;
  edit_dish_form: FormGroup;
  add_dish_form: FormGroup;
  
  imageSrc: string;

  productType = [
    { id: 1, code: 'DISH01', title: 'แบบวางเดี่ยว' },
    { id: 2, code: 'DISH02', title: 'แบบ Build-in' },
    { id: 3, code: 'DISH00', title: 'อื่นๆ' },
  ];

  productID = {
    type: '',
  };

  select(type, _$event) {
    if (type == 'type') {
      this.productID.type = _$event.target.value;
    }
    var ICODE =
      this.productID.type + '-' + (Math.floor(Math.random() * 9999) + 1);
    (<HTMLInputElement>document.getElementById('code')).value = ICODE;
    this.add_dish_form.patchValue({ code: ICODE });
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService,
    private http: HttpClient
  ) {
    this.add_dish_form = this.formBuilder.group({
      type: new FormControl("", [Validators.required]),
      code: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      detail: new FormControl("", [Validators.required]),
      // amount: new FormControl("", [Validators.required]),
      price: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.max(100000),
      ]),
      avatar: ['', Validators.required],
    });

    this.edit_dish_form = this.formBuilder.group({
      dish_sys_id: ["", Validators.required],
      type: new FormControl("", [Validators.required]),
      code: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      detail: new FormControl("", [Validators.required]),
      // amount: new FormControl("", [Validators.required]),
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

  masterDish;

  ngOnInit(): void { this.loadDataMaster();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  dishOnSubmit(form: any) {
    if (!this.add_dish_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.masterService
        .addMasterDishs( 
        form.value.type,
        form.value.code,
        form.value.name,
        form.value.brand,
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

  dishEditOnSubmit(form: any) {
    if (!this.edit_dish_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.masterService
        .updateMasterDishs(
          form.value.dish_sys_id,
          form.value.type,
          form.value.code,
          form.value.name,
          form.value.brand,
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
    this.edit_dish_form.controls['air_sys_id'].setValue(trdata.dish_sys_id);
    this.edit_dish_form.controls['name'].setValue(trdata.name);
    this.edit_dish_form.controls['code'].setValue(trdata.code);
    this.edit_dish_form.controls['brand'].setValue(trdata.brand);
    this.edit_dish_form.controls['type'].setValue(trdata.type);
    this.edit_dish_form.controls['detail'].setValue(trdata.detail);
    this.edit_dish_form.controls['price'].setValue(trdata.price);
    this.edit_dish_form.controls['amount'].setValue(trdata.amount);
    this.edit_dish_form.controls['this.photo'].setValue(trdata.this.photo);
    this.edit_dish_form.controls['isvoid'].setValue(
      trdata.isvoid.toString()
    );

    this.modalService.open('modal_editcate');
  }

  loadDataMaster() {
    this.masterService.getMasterDishs().subscribe(
      (res: any) => {
        this.masterDish = res;
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

          this.add_dish_form.patchValue({
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
