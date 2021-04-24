import { NbDialogService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';

import Swal from "sweetalert2";
import { environment } from '../../../../environments/environment';
import { MasterService } from '../../../_services/master.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'ngx-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  edit_category_option;
  category_option;
  group_add_form: FormGroup;
  group_edit_form: FormGroup;
  photo: File;
  imageSrc: string;
  private url = environment.serverURL;
  defaultRowPerPage = 10;
  settings = {
    pager: {
      display: true,
      perPage: this.defaultRowPerPage
    },
    actions: {
      position: "right",
      add: false,
      edit: false,
      editable: false,
      columnTitle: "Action",
    },
    // selectMode: 'multi',
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    //   confirmCreate: true,
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    //   confirmSave: true,
    // },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      // category_sys_id: {
      //   title: "Category ID",
      //   type: "number",
      //   editable: false,
      // },
      category_name: {
        title: "Category Name",
        type: "string",
        editable: false,
      },
      // product_sys_id: {
      //   title: "Product ID",
      //   type: "number",
      //   editable: false,
      // },
      group_name: {
        title: "Group Name",
        type: "text",
      },
       file: {
        title: "Picture",
        type: "html",
        edit: false,
        valuePrepareFunction: (avatar) => { return `<img class='table-thumbnail-img' src="${avatar}" height="100" width="100"/>` }
      },
    },
  };

  masterGroup: LocalDataSource = new LocalDataSource();

  constructor(
    private masterService: MasterService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private http: HttpClient
  ) {
    this.group_add_form = this.formBuilder.group({
      category_sys_id: new FormControl("", [Validators.required]),
      group_name: new FormControl("", [Validators.required]),
      avatar: ["", Validators.required],
     
    });
    this.group_edit_form = this.formBuilder.group({
      category_sys_id: new FormControl("", [Validators.required]),
      group_sys_id: new FormControl("", [Validators.required]),
      group_name: new FormControl("", [Validators.required]),
      avatar: ["", Validators.required],
      isvoid: 0,
    });
  }

  ngOnInit(): void {
    this.loadDataCategory();
    this.loadDataMaster();
    this.loadDataEditCategory();
  }

  OnSubmit(form: any) {
    console.log(this.group_add_form);
    // console.log( this.photo);
    

    if (!this.group_add_form.valid) {
      Swal.fire("Input Valid!", "Please enter require input", "info");
    } else {
      this.masterService
        .addMasterGroup(
          form.value.group_name,
          form.value.category_sys_id,
          
          this.photo
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire("Successful!", "added successful.", "success");
          },
          (error) => {
            if (error.status === 200 || error.status === 201) {
              Swal.fire("Error!", "error : " + error.status, "error");
              this.loadDataMaster();
            } else {
              console.log(error.status);
              Swal.fire("Error!", "error : " + error.status, "error");
            }
          }
        );
    }
  }

  EditOnSubmit(form: any) {
    console.log("-----------------------");
    
    console.log(this.group_edit_form);
    
    if (!this.group_edit_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.masterService
        .updateMasterGroup(
          form.value.group_sys_id,
          form.value.group_name,
          form.value.category_sys_id,
          this.photo,
          form.value.isvoid
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'Group edited successful.', 'success');
            // this.loader = false;
          },
          (error) => {
            if (error.status === 200 || error.status === 201) {
              Swal.fire('Error!', 'error : ' + error.status, 'error');
              this.loadDataMaster();
              // this.loader = false;
            } else {
              console.log(error.status);
              Swal.fire('Error!', 'error : ' + error.status, 'error');
            }
          }
        );
    }
  }

  loadDataCategory() {
    this.masterService.getMasterCatagory().subscribe(
      (res: any) => {
        this.category_option = res;
      },
      (error) => {
        console.log("error" + error.status);
      }
    );
  }

  loadDataEditCategory() {
    this.masterService.getMasterCatagory().subscribe(
      (res: any) => {
        this.edit_category_option = res;
      },
      (error) => {
        console.log("error" + error.status);
      }
    );
  }

  loadDataMaster() {
    this.masterService.getMasterGroup().subscribe(
      (res: any) => {
        this.masterGroup = res;
        
      },
      (error) => {
        console.log("error" + error.status);
      }
    );
  }

  onCreateConfirm(event): void {
    console.log("create");
    var data = {
      category_sys_id: event.newData.category_sys_id,
      group_name: event.newData.group_name,
     
    };
    this.http.post<any>(this.url + "/group/post", data).subscribe(
      (res) => {
        console.log(res);
        event.confirm.resolve(event.newData);
        Swal.fire({
          icon: "success",
          title: "added successful.",
          showConfirmButton: false,
          timer: 1500,
        });
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
  onEditConfirm(event): void {
    console.log("edit");
    var data = {
     
      group_name: event.newData.group_name,
     
    };
    this.http
      .put<any>(
        this.url + "/group/edit/" + event.newData.group_sys_id, data)
      .subscribe(
        (res) => {
          console.log(res);
          event.confirm.resolve(event.newData);
          Swal.fire({
            icon: "success",
            title: "edited successful.",
            showConfirmButton: false,
            timer: 1500,
          });
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
    var REST_URL = this.url + "/group/delete/" + event.data.group_sys_id;
    this.http.delete<any>(REST_URL).subscribe(
      (res) => {
        console.log(res);
        event.confirm.resolve(event.source.data);
        Swal.fire({
          icon: "success",
          title: "deleted successful.",
          showConfirmButton: false,
          timer: 1500,
        });
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

          this.group_add_form.patchValue({
            fileSource: reader.result,
          });
        };
      }
    } catch (e) {}
  }
}
