import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  NbDialogService,
  NbComponentStatus,
  NbComponentShape,
  NbComponentSize,
} from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";

import Swal from "sweetalert2";
import { environment } from "../../../../environments/environment";
import { MasterService } from "../../../_services/master.service";

@Component({
  selector: "ngx-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  type_option;
  category_option;
  brand_option;
  group_option;
  selectedCategory;
  findGroup;
  selectedGroup;
  findType;
  defaultRowPerPage = 10;
  product_add_form: FormGroup;
  product_edit_form: FormGroup;
  photo: File;
  imageSrc: string;
  
  private url = environment.serverURL;
  
  settings = {
    pager: {
      display: true,
      perPage: this.defaultRowPerPage
    },
    actions: {
      position: "right",
      add: false,
      edit: true,
      editable: false,
      columnTitle: "Action",
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
      category_name: {
        title: "Category",
        type: "string",
        editable: false,
      },
      group_name: {
        title: "Group",
        type: "string",
        editable: false,
      },
      type_name: {
        title: "Type",
        type: "string",
        editable: false,
      },
      brand_name: {
        title: "Brand",
        type: "string",
      },
      name: {
        title: "Product Name",
        type: "text",
      },
      detail: {
        title: "Detail",
        type: "text",
      },
      price: {
        title: "Price",
        type: "number",
      },
      amount: {
        title: "Amount",
        type: "number",
      },
      file: {
        title: "Picture",
        type: "html",
        editable: false,
        valuePrepareFunction: (avatar) => { return `<img class='table-thumbnail-img' src="${avatar}" height="100" width="100"/>` }
      },
      
    },
  };

  masterProduct: LocalDataSource = new LocalDataSource();

  constructor(
    private masterService: MasterService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private http: HttpClient
  ) {
    this.product_add_form = this.formBuilder.group({
      category_sys_id: new FormControl("", [Validators.required]),
      group_sys_id: new FormControl("", [Validators.required]),
      type_sys_id: new FormControl("", [Validators.required]),
      brand_sys_id: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      detail: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required]),
      avatar: ["", Validators.required],
    });
    this.product_edit_form = this.formBuilder.group({
      type_sys_id: new FormControl("", [Validators.required]),
      product_sys_id: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      avatar: ["", Validators.required],
      isvoid: 0,
    });
  }

  ngOnInit(): void {
    this.loadDataCategory();
    this.loadDataBrand();
    this.loadDataMaster();
  }

  OnSubmit(form: any) {
    console.log(this.product_add_form);
    console.log(this.photo);

    if (!this.product_add_form.valid) {
      Swal.fire("Input Valid!", "Please enter require input", "info");
    } else {
      this.masterService
        .addMasterProduct(
          form.value.category_sys_id,
          form.value.group_sys_id,
          form.value.type_sys_id,
          form.value.brand_sys_id,
          form.value.name,
          form.value.detail,
          form.value.price,
          form.value.amount,
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
  // load data
  loadDataBrand() {
    this.masterService.getMasterBrand().subscribe(
      (res: any) => {
        this.brand_option = res;
      },
      (error) => {
        console.log("error" + error.status);
      }
    );
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


  loadDataMaster() {
    this.masterService.getMasterProduct().subscribe(
      (res: any) => {
        this.masterProduct = res;
      },
      (error) => {
        console.log("error" + error.status);
      }
    );
  }

  // onCreateConfirm(event): void {
  //   console.log("create");
  //   var data = {
  //     category_sys_id: event.newData.category_sys_id,
  //     product_name: event.newData.product_name,
  //     status: event.newData.status,
  //   };
  //   this.http.post<any>(this.url + "/product/post", data).subscribe(
  //     (res) => {
  //       console.log(res);
  //       event.confirm.resolve(event.newData);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Product added successful.",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
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
      
      name: event.newData.name,
      detail: event.newData.detail,
      price: event.newData.price,
      amount: event.newData.amount,
      avatar: event.newData.avatar,
    };
    this.http
      .put<any>(
        this.url + "/product/edit/" + event.newData.product_sys_id,
        data
      )
      .subscribe(
        (res) => {
          console.log(res);
          event.confirm.resolve(event.newData);
          Swal.fire({
            icon: "success",
            title: "Product edited successful.",
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
    var REST_URL = this.url + "/product/delete/" + event.data.product_sys_id;
    this.http.delete<any>(REST_URL).subscribe(
      (res) => {
        console.log(res);
        event.confirm.resolve(event.source.data);
        Swal.fire({
          icon: "success",
          title: "Product deleted successful.",
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

          this.product_add_form.patchValue({
            fileSource: reader.result,
          });
        };
      }
    } catch (e) {}
  }
}
