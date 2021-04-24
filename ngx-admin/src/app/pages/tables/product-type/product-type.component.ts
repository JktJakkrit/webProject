import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { environment } from '../../../../environments/environment';
import { MasterService } from '../../../_services/master.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'ngx-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {
  edit_category_option;
  findEditGroup;
  type_add_form: FormGroup;
  type_edit_form: FormGroup;
  findGroup;
  category_option;
  selectedCategory;
  selectedEditCategory;
  private url = environment.serverURL;

  settings = {
    pager: {
      display: true,
      perPage: 5,
    },
    actions: {
      position: 'right',
      add: false,
      edit:false,
      editable:false,
      columnTitle: 'Action',
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
      // group_sys_id: {
      //   title: "Product ID",
      //   type: "number",
      //   editable: false,
      // },
      group_name: {
        title: "Group Name",
        type: "text",
        editable: false,
      },
      // type_sys_id: {
      //   title: "Type ID",
      //   type: "number",
      //   editable: false,
      // },
      type_name: {
        title: "Type Name",
        type: "text",
      },
    },
  };
  
  masterType: LocalDataSource = new LocalDataSource();

  constructor(
    private masterService: MasterService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private http: HttpClient
  ) {
    this.type_add_form = this.formBuilder.group({
      category_sys_id: new FormControl("", [Validators.required]),
      group_sys_id: new FormControl("", [Validators.required]),
      type_name: new FormControl("", [Validators.required]),
    });
    this.type_edit_form = this.formBuilder.group({
      type_sys_id: new FormControl("", [Validators.required]),
      category_sys_id: new FormControl("", [Validators.required]),
      group_sys_id: new FormControl("", [Validators.required]),
      type_name: new FormControl("", [Validators.required]),
      isvoid: 0,
    });
  }
  ngOnInit(): void {
    this.loadDataMaster();
    this.loadDataCategory();
    this.loadDataEditCategory();
  }

  OnSubmit(form: any) {
    console.log(this.type_add_form);

    if (!this.type_add_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.masterService
        .addMasterType(
          form.value.type_name,
          form.value.category_sys_id,
          form.value.group_sys_id,
          
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'added successful.', 'success');
            // this.masterType.refresh();
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

  EditOnSubmit(form: any) {
    console.log("-----------------------");
    
    console.log(this.type_edit_form);
    
    if (!this.type_edit_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.masterService
        .updateMasterType(
          form.value.type_sys_id,
          form.value.type_name,
          form.value.category_sys_id,
          form.value.group_sys_id,
          // this.photo,
          form.value.isvoid
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire('Successful!', 'Type edited successful.', 'success');
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
        console.log(res);
        
        this.category_option = res;
      },
      (error) => {
        console.log("error" + error.status);
      }
    );
  }

  // load form select Category
  onSelectedCategory(event) {
    console.log(event);
    console.log(event.target);
    
    const value = event;
    this.selectedCategory = value;
    console.log("the selectedCategory is " + value);
    this.loadfindGroup();
  }
  loadfindGroup() {
    console.log("===== loadfindGroup =====");
    console.log(this.selectedCategory);
    console.log("===== loadfindGroup =====");
    
    this.masterService.getGroup(this.selectedCategory).subscribe(
      (res: any) => {
        console.log(res);
        
        this.findGroup = res;
        console.log("find Group " + this.findGroup);
      },
      (error) => {
        Swal.fire("Error!", "error : " + error.status, "error");
      }
    );
  }

  // edit

  
  loadDataEditCategory() {
    this.masterService.getMasterCatagory().subscribe(
      (res: any) => {
        console.log(res);
        
        this.edit_category_option = res;
      },
      (error) => {
        console.log("error" + error.status);
      }
    );
  }

  // load form select Category
  onSelectedEditCategory(event) {
    console.log(event);
    console.log(event.target);
    
    const value = event;
    this.selectedEditCategory = value;
    console.log("the selectedCategory is " + value);
    this.loadfindEditGroup();
  }
  loadfindEditGroup() {
    console.log("===== loadfindGroup =====");
    console.log(this.selectedEditCategory);
    console.log("===== loadfindGroup =====");
    
    this.masterService.getGroup(this.selectedEditCategory).subscribe(
      (res: any) => {
        console.log(res);
        
        this.findEditGroup = res;
        console.log("find Group " + this.findEditGroup);
      },
      (error) => {
        Swal.fire("Error!", "error : " + error.status, "error");
      }
    );
  }


  loadDataMaster(){
    this.masterService.getMasterType().subscribe(
      (res: any) => {
        this.masterType = res;
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
  //   this.http.post<any>(this.url + "/type/post", data).subscribe(
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
      // group_sys_id: event.newData.group_sys_id,
      type_name: event.newData.type_name,
      // type_sys_id: event.newData.type_sys_id,
      // product_name: event.newData.product_name,
    };
    this.http
      .put<any>(this.url + "/type/edit/" + event.newData.type_sys_id, data)
      .subscribe(
        (res) => {
          console.log(res);
          event.confirm.resolve(event.newData);
          Swal.fire({
            icon: 'success',
            title: 'Type edited successful.',
            showConfirmButton: false,
            timer: 1500
          })
          // this.masterType.refresh();
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
    var REST_URL = this.url + "/type/delete/" + event.data.type_sys_id;
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
        // this.masterType.refresh();
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

}
