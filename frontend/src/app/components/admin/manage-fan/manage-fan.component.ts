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
  selector: 'app-manage-fan',
  templateUrl: './manage-fan.component.html',
  styleUrls: ['./manage-fan.component.css']
})
export class ManageFanComponent implements OnInit {

  edit_fan_form: FormGroup;
  add_fan_form: FormGroup;

  imageSrc: string;

  productType = [
    { id: 1, code: "FAN01", title: "พัดลมตั้งโต๊ะ" },
    { id: 2, code: "FAN02", title: "พัดลมตั้งพื้น" },
    { id: 3, code: "FAN03", title: "พัดลมไอน้ำ" },
    { id: 4, code: "FAN00", title: "อื่นๆ" },
  ];

  productSize = [
    { id: 1, code: "S12", title: "12 inches" },
    { id: 2, code: "S14", title: "14 inches" },
    { id: 3, code: "S16", title: "16 inches" },
    { id: 4, code: "S18", title: "18 inches" },
    { id: 5, code: "S00", title: "Other" },
  ];

  productID = {
    type: "",
    size: "",
  };

  select(type, _$event) {
    if (type == "type") {
      this.productID.type = _$event.target.value;
    } else {
      this.productID.size = _$event.target.value;
    }
    var ICODE =
      this.productID.type +
      "-" +
      this.productID.size +
      "-" +
      (Math.floor(Math.random() * 9999) + 1);

    (<HTMLInputElement>document.getElementById("code")).value = ICODE;
    this.add_fan_form.patchValue({ icode: ICODE });
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService
  ) {
    this.add_fan_form = this.formBuilder.group({
      type: new FormControl("", [Validators.required]),
      icode: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      size: new FormControl("", [Validators.required]),
      detail: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required]),
      price: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.max(100000),
      ]),
      file: ["", Validators.required],
    });

    this.edit_fan_form = this.formBuilder.group({
      fan_sys_id: ["", Validators.required],
      type: new FormControl("", [Validators.required]),
      icode: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      size: new FormControl("", [Validators.required]),
      detail: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required]),
      price: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.max(100000),
      ]),
      file: ["", Validators.required],
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
      Swal.fire("Input Valid!", "Please enter require input", "info");
    } else {
      this.masterService
        .addMasterFan(
          form.value.type,
          form.value.icode,
          form.value.name,
          form.value.brand,
          form.value.detail,
          form.value.price,
          form.value.amount,
          form.value.size,
          form.value.file
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire("Successful!", "Fan added successful.", "success");
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
    if (!this.edit_fan_form.valid) {
      Swal.fire("Input Valid!", "Please enter require input", "info");
    } else {
      this.masterService
        .updateMasterFan(
          form.value.fan_sys_id,
          form.value.type,
          form.value.icode,
          form.value.name,
          form.value.brand,
          form.value.detail,
          form.value.price,
          form.value.amount,
          form.value.size,
          form.value.file,
          form.value.isvoid
        )

        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire("Successful!", "Fan edited successful.", "success");
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
    this.edit_fan_form.controls["fan_sys_id"].setValue(trdata.fan_sys_id);
    this.edit_fan_form.controls["name"].setValue(trdata.name);
    this.edit_fan_form.controls["icode"].setValue(trdata.icode);
    this.edit_fan_form.controls["brand"].setValue(trdata.brand);
    this.edit_fan_form.controls["type"].setValue(trdata.type);
    this.edit_fan_form.controls["detail"].setValue(trdata.detail);
    this.edit_fan_form.controls["price"].setValue(trdata.price);
    this.edit_fan_form.controls["size"].setValue(trdata.size);
    this.edit_fan_form.controls["amount"].setValue(trdata.amount);
    this.edit_fan_form.controls["file"].setValue(trdata.file);
    this.edit_fan_form.controls["isvoid"].setValue(trdata.isvoid.toString());

    this.modalService.open("modal_editcate");
  }

  loadDataMaster() {
    this.masterService.getMasterFans().subscribe(
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
        Swal.fire("Error!", "error : " + error.status, "error");
      }
    );
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.add_fan_form.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }
}