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
  selector: 'app-manage-wash',
  templateUrl: './manage-wash.component.html',
  styleUrls: ['./manage-wash.component.css']
})
export class ManageWashComponent implements OnInit {
  photo: File;
  edit_wash_form: FormGroup;
  add_wash_form: FormGroup;

  imageSrc: string;
  
  productCap = [
    { id: 1, code: 'C01', title: '0 - 6 Kg' },
    { id: 2, code: 'C02', title: '6.1 - 10 Kg' },
    { id: 3, code: 'C03', title: '10.1 - 20 Kg' },
    { id: 4, code: 'C04', title: 'More than 20 Kg' },
  ];

  productType = [
    { id: 1, code: 'W01', title: 'ฝาหน้า' },
    { id: 2, code: 'W02', title: 'ฝาบน' },
    { id: 3, code: 'W03', title: 'เครื่องอบผ้า' },
    { id: 4, code: 'W00', title: 'อื่นๆ' },
  ];

  productID = {
    type: '',
    cap: '',
  };

  select(type, _$event) {
    if (type == 'type') {
      this.productID.type = _$event.target.value;
    } else {
      this.productID.cap = _$event.target.value;
    }
    var ICODE =
      this.productID.type +
      '-' +
      this.productID.cap +
      '-' +
      (Math.floor(Math.random() * 9999) + 1);
    (<HTMLInputElement>document.getElementById('code')).value = ICODE;

    this.add_wash_form.patchValue({ code: ICODE });
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService
  ) {
    this.add_wash_form = this.formBuilder.group({
      type: new FormControl("", [Validators.required]),
      code: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      cap: new FormControl("", [Validators.required]),
      detail: new FormControl("", [Validators.required]),
      // amount: new FormControl("", [Validators.required]),
      price: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.max(100000),
      ]),
      avatar: ["", Validators.required],
    });

    this.edit_wash_form = this.formBuilder.group({
      wash_sys_id: ["", Validators.required],
      type: new FormControl("", [Validators.required]),
      code: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      cap: new FormControl("", [Validators.required]),
      detail: new FormControl("", [Validators.required]),
      // amount: new FormControl("", [Validators.required]),
      price: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.max(100000),
      ]),
      avatar: ["", Validators.required],
      isvoid: 0,
    });
  }
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  isDtInitialized: boolean = false;

  masterWash;

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
    if (!this.add_wash_form.valid) {
      Swal.fire("Input Valid!", "Please enter require input", "info");
    } else {
      this.masterService
        .addMasterWashings(
          form.value.type,
          form.value.code,
          form.value.name,
          form.value.brand,
          form.value.detail,
          form.value.price,
          // form.value.amount,
          form.value.cap,
          this.photo
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire("Successful!", "Washing-Machines added successful.", "success");
          },
          (error) => {
            if (error.status === 200 || error.status === 201) {
              Swal.fire("Error!", "error : " + error.status, "error");
              this.closeModal("modal_addcate");
              this.loadDataMaster();
            } else {
              console.log(error.status);
              Swal.fire("Error!", "error : " + error.status, "error");
            }
          }
        );
    }
  }

  dishEditOnSubmit(form: any) {
    if (!this.edit_wash_form.valid) {
      Swal.fire("Input Valid!", "Please enter require input", "info");
    } else {
      this.masterService
        .updateMasterWash(
          form.value.wash_sys_id,
          form.value.type,
          form.value.code,
          form.value.name,
          form.value.brand,
          form.value.detail,
          form.value.price,
          // form.value.amount,
          form.value.cap,
          this.photo,
          form.value.isvoid
        )

        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              "Successful!",
              "Washing-Machines edited successful.",
              "success"
            );
          },
          (error) => {
            if (error.status === 200 || error.status === 201) {
              Swal.fire("Error!", "error : " + error.status, "error");
              this.closeModal("modal_editcate");
              this.loadDataMaster();
            } else {
              console.log(error.status);
              Swal.fire("Error!", "error : " + error.status, "error");
            }
          }
        );
    }
  }

  editcate(trdata) {
    this.edit_wash_form.controls["wash_sys_id"].setValue(trdata.wash_sys_id);
    this.edit_wash_form.controls["name"].setValue(trdata.name);
    this.edit_wash_form.controls["code"].setValue(trdata.code);
    this.edit_wash_form.controls["brand"].setValue(trdata.brand);
    this.edit_wash_form.controls["type"].setValue(trdata.type);
    this.edit_wash_form.controls["detail"].setValue(trdata.detail);
    this.edit_wash_form.controls["price"].setValue(trdata.price);
    this.edit_wash_form.controls["cap"].setValue(trdata.cap);
    // this.edit_wash_form.controls["amount"].setValue(trdata.amount);
    this.edit_wash_form.controls["avatar"].setValue(trdata.avatar);
    this.edit_wash_form.controls["isvoid"].setValue(trdata.isvoid.toString());

    this.modalService.open("modal_editcate");
  }

  loadDataMaster() {
    this.masterService.getMasterWashings().subscribe(
      (res: any) => {
        this.masterWash = res;
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
        Swal.fire("Error!", "error : " + error.status, "error");
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

          this.add_wash_form.patchValue({
            fileSource: reader.result,
          });
        };
      }
    } catch (e) {}
  }

}