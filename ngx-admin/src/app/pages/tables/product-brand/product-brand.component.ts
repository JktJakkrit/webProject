import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { MasterService } from './../../../_services/master.service';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'ngx-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.scss']
})
export class ProductBrandComponent implements OnInit {

  brand_add_form: FormGroup;
  brand_edit_form: FormGroup;
  category_option;
  product_option;
  selectedCategory;
  findGroup;
  selectedGroup;
  findType;
  private url = environment.serverURL;

  settings = {
    pager: {
      display: true,
      perPage: 5,
    },
    actions: {
      position: 'right',
      add: true,
      edit:true,
      editable:false,
      columnTitle: 'Action',
    },
    // selectMode: 'multi',
    add: {
      addButtonContent: '<i><h6>เพิ่ม Brand</h6></i>',
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
  
      brand_name: {
        title: "Brand",
        type: "text",
      },
    },
  };
  
  masterBrand: LocalDataSource = new LocalDataSource();

  constructor(
    private masterService: MasterService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private http: HttpClient
  ) {
    this.brand_add_form = this.formBuilder.group({
     
      brand_name: new FormControl("", [Validators.required]),
    });
    this.brand_edit_form = this.formBuilder.group({
      brand_sys_id: new FormControl("", [Validators.required]),
      brand_name: new FormControl("", [Validators.required]),
      isvoid: 0,
    });
  }
  ngOnInit(): void {
    this.loadDataMaster();
   
  }

  OnSubmit(form: any) {
    console.log(this.brand_add_form);

    if (!this.brand_add_form.valid) {
      Swal.fire('Input Valid!', 'Please enter require input', 'info');
    } else {
      this.masterService
        .addMasterBrand(
          form.value.product_sys_id,
          form.value.brand_name,
          
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
   // load form select Category
   onSelectedCategory(event) {
    console.log(event);
    // console.log(event.target);
    
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

  // load form select Category
  onSelectedGroup(event) {
    console.log(event);
    const value = event;
    this.selectedGroup = value;
    
    console.log("the selectedGroup is " + value);
    this.loadfindType();
  }
  loadfindType() {
    console.log("===== loadfindType =====");
    console.log(this.selectedGroup);
    console.log("===== loadfindType =====");
    this.masterService.getType(this.selectedGroup).subscribe(
      (res: any) => {
        console.log(res);
        this.findType = res;
        console.log("find Type " + this.findType);
      },
      (error) => {
        Swal.fire("Error!", "error : " + error.status, "error");
      }
    );
  }

  loadDataProduct() {
    this.masterService.getMasterProduct().subscribe(
      (res: any) => {
        console.log(res);
      
        this.product_option = res;
      },
      (error) => {
        console.log("error" + error.status);
      }
    );
  }

  loadDataMaster(){
    this.masterService.getMasterBrand().subscribe(
      (res: any) => {
        this.masterBrand = res;
      },
      (error) => {
        console.log("error" + error.status);
      })
  }

  onCreateConfirm(event): void {
    console.log("create");
    var data = {
      brand_sys_id: event.newData.brand_sys_id,
      brand_name: event.newData.brand_name,
      
    };
    this.http.post<any>(this.url + "/brand/post", data).subscribe(
      (res) => {
        console.log(res);
        event.confirm.resolve(event.newData);
        Swal.fire({
          icon: 'success',
          title: 'Brand added successful.',
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
      // product_sys_id: event.newData.product_sys_id,
      brand_name: event.newData.brand_name,
      // type_sys_id: event.newData.type_sys_id,
      // product_name: event.newData.product_name,
    };
    this.http
      .put<any>(this.url + "/brand/edit/" + event.newData.brand_sys_id, data)
      .subscribe(
        (res) => {
          console.log(res);
          event.confirm.resolve(event.newData);
          Swal.fire({
            icon: 'success',
            title: 'edited successful.',
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
    var REST_URL = this.url + "/brand/delete/" + event.data.brand_sys_id;
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
          Swal.fire({
            icon: 'success',
            title: 'Brand deleted successful.',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Brand deleted successful.',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    );
  }

}
