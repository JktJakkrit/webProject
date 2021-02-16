import { NbDialogService } from '@nebular/theme';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { environment } from '../../../../environments/environment';
import { MasterService } from '../../../_services/master.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import Swal from "sweetalert2";
@Component({
  selector: 'ngx-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  photo: File;
  imageSrc: string;
  category_add_form: FormGroup;
  category_edit_form: FormGroup;
  private url = environment.serverURL;
  settings = {
    pager: {
      display: true,
      perPage: 5,
    },
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
      // category_sys_id: {
      //   title: "ID",
      //   type: "number",
      //   editable: false,
      // },
      category_name: {
        title: "Category",
        type: "string",
      },
      file: {
        title: "Picture",
        type: "html",
        edit: false,
        valuePrepareFunction: (avatar) => { return `<img class='table-thumbnail-img' src="${avatar}" height="100" width="100"/>` }
      },
    },
  };

  category_option: LocalDataSource = new LocalDataSource();

  constructor(
    private masterService: MasterService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private http: HttpClient
  ) {
    this.category_add_form = this.formBuilder.group({
      avatar: ["", Validators.required],
      category_name: new FormControl("", [Validators.required]),
      // avatar: new FormControl("", [Validators.required]),
    });
    this.category_edit_form = this.formBuilder.group({
      category_sys_id: new FormControl("", [Validators.required]),
      category_name: new FormControl("", [Validators.required]),
      isvoid: 0,
    });
  }
  masterCategory;

  ngOnInit(): void {
    this.loadDataMasterCategory();
  }

  loadDataMasterCategory() {
    this.masterService.getMasterCatagory().subscribe(
      (res: any) => {
        this.masterCategory = res;
      },
      (error) => {
        console.log("error" + error.status);
      }
    );
  }
 
  OnSubmit(form: any) {
    console.log(this.category_add_form);
    console.log(this.photo);

    if (!this.category_add_form.valid) {
      Swal.fire("Input Valid!", "Please enter require input", "info");
    } else {
      this.masterService
        .addMasterCategory(
          form.value.category_name,
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
              this.loadDataMasterCategory();
            } else {
              console.log(error.status);
              Swal.fire("Error!", "error : " + error.status, "error");
            }
          }
        );
    }
  }

  onCreateConfirm(event): void {
    console.log("create");
    var data = {
      // category_sys_id: event.newData.category_sys_id,
      category_name: event.newData.category_name,
      // status: event.newData.status,
    };
    this.http.post<any>(this.url + "/category/post", data).subscribe(
      (res) => {
        console.log(res);
        event.confirm.resolve(event.newData);
        Swal.fire({
          icon: 'success',
          title: 'Category added successful.',
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
  onEditConfirm(event): void {
    console.log("edit");
    var data = {
      // category_sys_id: event.newData.category_sys_id,
      category_name: event.newData.category_name,
      file: event.newData.file,
    };
    this.http
      .put<any>(this.url + "/category/edit/" + event.newData.category_sys_id, data)
      .subscribe(
        (res) => {
          console.log(res);
          event.confirm.resolve(event.newData);
          Swal.fire({
            icon: 'success',
            title: 'Category edited successful.',
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
    var REST_URL = this.url + "/category/delete/" + event.data.category_sys_id;
    this.http.delete<any>(REST_URL).subscribe(
      (res) => {
        console.log(res);
        event.confirm.resolve(event.source.data);
        Swal.fire({
          icon: 'success',
          title: 'Category deleted successful.',
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

          this.category_add_form.patchValue({
            fileSource: reader.result,
          });
        };
      }
    } catch (e) {}
  }

}
