import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';

import Swal from "sweetalert2";
import { environment } from '../../../../environments/environment';
import { MasterService } from '../../../_services/master.service';
@Component({
  selector: 'ngx-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  manage_add_form: FormGroup;
  manage_edit_form: FormGroup;
  product_option;

  photo: File;
  imageSrc: string;
  private url = environment.serverURL;

  settings = {
    actions: {
      position: 'right',
      add: false,
      edit:true,
      editable:false,
      columnTitle: 'Action',
    },
    // selectMode: 'multi',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      product_name: {
        title: "Product Name",
        type: "text",
        editable: false,
      },

      mn_name: {
        title: "Sub Product Name",
        type: "text",
        // editable: false,
      },
      mn_detail: {
        title: "Detail",
        type: "text",
        // editable: false,
      },
      mn_price: {
        title: "Price",
        type: "text",
        // editable: false,
      },
      mn_amount: {
        title: "Amount",
        type: "text",
        // editable: false,
      },
      avatar: {
        title: "Picture",
        type: "html",
        // editable: false,
      },
      // f.append('product_sys_id', product_sys_id);
      // f.append('mn_name', mn_name);
      // f.append('mn_detail', mn_detail);
      // f.append('mn_price', mn_price);
      // f.append('mn_amount', mn_amount);
      // f.append('avatar', avatar, avatar.name);
    },
  };
  
  masterManage: LocalDataSource = new LocalDataSource();

  constructor(
    private masterService: MasterService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private http: HttpClient
  ) {
    this.manage_add_form = this.formBuilder.group({
      product_sys_id: new FormControl("", [Validators.required]),
      mn_name: new FormControl("", [Validators.required]),
      mn_detail: new FormControl("", [Validators.required]),
      mn_price: new FormControl("", [Validators.required]),
      mn_amount: new FormControl("", [Validators.required]),
      avatar: ["", Validators.required],
    });
    this.manage_edit_form = this.formBuilder.group({
      mn_sys_id: new FormControl("", [Validators.required]),
      product_sys_id: new FormControl("", [Validators.required]),
      mn_name: new FormControl("", [Validators.required]),
      mn_detail: new FormControl("", [Validators.required]),
      mn_price: new FormControl("", [Validators.required]),
      mn_amount: new FormControl("", [Validators.required]),
      avatar: ["", Validators.required],
      isvoid: 0,
    });
  }
  ngOnInit(): void {
    this.loadDataMaster();
    this.loadDataProduct();
  }

  OnSubmit(form: any) {
    console.log(this.manage_add_form);

    if (!this.manage_add_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.masterService
        .addMasterManage(
          form.value.product_sys_id,
          form.value.mn_name,
          form.value.mn_detail,
          form.value.mn_price,
          form.valie.mn_amount,
          this.photo
          
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'added successful.', 'success');
          },
          (error) => {
            if (error.status === 200 || error.status === 201) {
              Swal.fire('Error!', 'error : ' + error.status, 'error');  
              this.loadDataMaster();
            } else {
              console.log(error.status);
              Swal.fire('Error!', 'error : ' + error.status, 'error');
            }
          }
        );
    }

  }

  loadDataProduct() {
    this.masterService.getMasterProduct().subscribe(
      (res: any) => {
        this.product_option = res;
      },
      (error) => {
        console.log("error" + error.status);
      }
    );
  }

  loadDataMaster(){
    this.masterService.getMasterManage().subscribe(
      (res: any) => {
        this.masterManage = res;
      },
      (error) => {
        console.log("error" + error.status);
      })
  }

  // onCreateConfirm(event): void {
  //   console.log("create");
  //   var data = {
  //     category_sys_id: event.newData.category_sys_id,
  //     category_name: event.newData.category_name,
  //     status: event.newData.status,
  //   };
  //   this.http.post<any>(this.url + "/manage/post", data).subscribe(
  //     (res) => {
  //       console.log(res);
  //       event.confirm.resolve(event.newData);
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Type added successful.',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     },
  //     (err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //         console.log("Client-side error occured.");
  //       } else {
  //         console.log("Server-side error occured.");
  //       }
  //     }
  //   );
  // }
  onEditConfirm(event): void {
    console.log("edit");
    var data = {
      // product_sys_id: event.newData.product_sys_id,
      mn_name: event.newData.mn_name,
      mn_detail: event.newData.mn_detail,
      mn_price: event.newData.mn_price,
      mn_amount: event.newData.mn_amount,
      avatar: event.newData.avatar,
      // type_sys_id: event.newData.type_sys_id,
      // product_name: event.newData.product_name,
    };
    this.http
      .put<any>(this.url + "/manage/edit/" + event.newData.mn_sys_id, data)
      .subscribe(
        (res) => {
          console.log(res);
          event.confirm.resolve(event.newData);
          Swal.fire({
            icon: 'success',
            title: 'Manage Product edited successful.',
            showConfirmButton: false,
            timer: 1500
          })
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        }
      );
  }

  onDeleteConfirm(event): void {
    console.log(event.data);
    var REST_URL = this.url + "/manage/delete/" + event.data.mn_sys_id;
    this.http.delete<any>(REST_URL).subscribe(
      (res) => {
        console.log(res);
        event.confirm.resolve(event.source.data);
        Swal.fire({
          icon: 'success',
          title: 'deleted successful.',
          showConfirmButton: false,
          timer: 1500
        })
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
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

          this.manage_add_form.patchValue({
            fileSource: reader.result,
          });
        };
      }
    } catch (e) {}
  }

}
