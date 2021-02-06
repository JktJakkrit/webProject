import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/_services/modal.service';
import { OtherService } from 'src/app/_services/other.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  photo: File;
  add_other_form: FormGroup;
  edit_other_form: FormGroup;
  imageSrc: string;
  deleteOther;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,

    private http: HttpClient,
    private otherService: OtherService
  ) {
    this.add_other_form = this.formBuilder.group({
      type: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(100000),
      ]),
      avatar: ['', Validators.required],
    });

    this.edit_other_form = this.formBuilder.group({
      other_sys_id: ['', Validators.required],
      type: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
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

  masterOther;

  ngOnInit() {
    this.loadDataMaster();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  otherOnSubmit(form: any) {
    if (!this.add_other_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.otherService
        .addMasterOther(
          form.value.type,
          form.value.name,
          form.value.brand,
          form.value.detail,
          form.value.amount,
          form.value.price,
          this.photo
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              'Successful!',
              form.value.name + ' added successful.',
              'success'
            );
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

  otherEditOnSubmit(form: any) {
    if (!this.edit_other_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.otherService
        .updateMasterOther(
          form.value.other_sys_id,
          form.value.type,
          form.value.name,
          form.value.brand,
          form.value.detail,
          form.value.amount,
          form.value.price,
          this.photo,
          form.value.isvoid
        )

        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              'Successful!',
              'Other edited successful.',
              'success'
            );
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
    this.edit_other_form.controls['other_sys_id'].setValue(trdata.other_sys_id);
    this.edit_other_form.controls['name'].setValue(trdata.name);
    this.edit_other_form.controls['brand'].setValue(trdata.brand);
    this.edit_other_form.controls['type'].setValue(trdata.type);
    this.edit_other_form.controls['detail'].setValue(trdata.detail);
    this.edit_other_form.controls['price'].setValue(trdata.price);
    this.edit_other_form.controls['amount'].setValue(trdata.amount);
    this.edit_other_form.controls['avatar'].setValue(trdata.avatar);
    this.edit_other_form.controls['isvoid'].setValue(trdata.isvoid.toString());

    this.modalService.open('modal_editcate');
  }

  loadDataMaster() {
    this.otherService.getMasterOther().subscribe(
      (res: any) => {
        this.masterOther = res;
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

          this.add_other_form.patchValue({
            fileSource: reader.result,
          });
        };
      }
    } catch (e) {}
  }

  setDeleteOther(other) {
    this.deleteOther = other;
  }
  deleteOtherSubmit() {
    console.log(this.deleteOther);
    this.otherService.deleteOther(this.deleteOther.other_sys_id).subscribe(
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