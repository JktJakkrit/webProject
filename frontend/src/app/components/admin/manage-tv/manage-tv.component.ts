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
  selector: 'app-manage-tv',
  templateUrl: './manage-tv.component.html',
  styleUrls: ['./manage-tv.component.css']
})
export class ManageTvComponent implements OnInit {
  edit_tv_form: FormGroup;
  add_tv_form: FormGroup;
  photo: File;
  imageSrc: string;
  
  productScsize = [
    { id: 1, code: "SC01", title: "14 - 31 inches" },
    { id: 2, code: "SC02", title: "32 - 43 inches" },
    { id: 3, code: "SC03", title: "44 - 55 inches" },
    { id: 4, code: "SC04", title: "56 - 65 inches" },
    { id: 5, code: "SC05", title: "66 - 100 inches" },
    { id: 6, code: "SC06", title: "อื่นๆ" },
  ];

  productType = [
    { id: 1, code: "TV01", title: "LED & Nano Cell & QLED" },
    { id: 2, code: "TV02", title: "OLED" },
    { id: 3, code: "TV03", title: "Projectors" },
    { id: 4, code: "TV00", title: "อื่นๆ" },
  ];

  productID = {
    type: "",
    scsize: "",
  };

  select(type, _$event) {
    if (type == "type") {
      this.productID.type = _$event.target.value;
    } else {
      this.productID.scsize = _$event.target.value;
    }
    var ICODE =
      this.productID.type +
      "-" +
      this.productID.scsize +
      "-" +
      (Math.floor(Math.random() * 9999) + 1);
    (<HTMLInputElement>document.getElementById("code")).value = ICODE;

    this.add_tv_form.patchValue({ code: ICODE });
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService,
    private http: HttpClient
  ) {
    this.add_tv_form = this.formBuilder.group({
      type: new FormControl("", [Validators.required]),
      code: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      scsize: new FormControl("", [Validators.required]),
      detail: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required]),
      price: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.max(100000),
      ]),
      avatar: ["", Validators.required],
    });

    this.edit_tv_form = this.formBuilder.group({
      tv_sys_id: ["", Validators.required],
      type: new FormControl("", [Validators.required]),
      code: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      scsize: new FormControl("", [Validators.required]),
      detail: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required]),
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

  masterTv;

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
    if (!this.add_tv_form.valid) {
      Swal.fire("Input Valid!", "Please enter require input", "info");
    } else {
      this.masterService
        .addMasterTv(
          form.value.type,
          form.value.code,
          form.value.name,
          form.value.brand,
          form.value.detail,
          form.value.price,
          form.value.amount,
          form.value.scsize,
          this.photo
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
    if (!this.edit_tv_form.valid) {
      Swal.fire("Input Valid!", "Please enter require input", "info");
    } else {
      this.masterService
        .updateMasterTv(
          form.value.tv_sys_id,
          form.value.type,
          form.value.code,
          form.value.name,
          form.value.brand,
          form.value.detail,
          form.value.price,
          form.value.amount,
          form.value.scsize,
          this.photo,
          form.value.isvoid
        )

        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              "Successful!",
              "Televisions edited successful.",
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
    this.edit_tv_form.controls["refri_sys_id"].setValue(trdata.refri_sys_id);
    this.edit_tv_form.controls["name"].setValue(trdata.name);
    this.edit_tv_form.controls["code"].setValue(trdata.code);
    this.edit_tv_form.controls["brand"].setValue(trdata.brand);
    this.edit_tv_form.controls["type"].setValue(trdata.type);
    this.edit_tv_form.controls["detail"].setValue(trdata.detail);
    this.edit_tv_form.controls["price"].setValue(trdata.price);
    this.edit_tv_form.controls["scsize"].setValue(trdata.scsize);
    this.edit_tv_form.controls["amount"].setValue(trdata.amount);
    this.edit_tv_form.controls["avatar"].setValue(trdata.avatar);
    this.edit_tv_form.controls["isvoid"].setValue(trdata.isvoid.toString());

    this.modalService.open("modal_editcate");
  }

  loadDataMaster() {
    this.masterService.getMasterTvs().subscribe(
      (res: any) => {
        this.masterTv = res;
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

          this.add_tv_form.patchValue({
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