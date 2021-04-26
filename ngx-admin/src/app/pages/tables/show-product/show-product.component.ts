import { Component, Input, OnInit } from "@angular/core";
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { environment } from "../../../../environments/environment";
import { MasterService } from "../../../_services/master.service";

import Swal from "sweetalert2";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "ngx-show-product",
  templateUrl: "./show-product.component.html",
  styleUrls: ["./show-product.component.scss"],
})
export class ShowProductComponent implements OnInit {
  find_form: FormGroup;
  category_option;
  findGroup;
  selectedCategory;
  masterGroup;
  selectedGroup;
  findSomeProduct;
  defaultRowPerPage = 10;
  private url = environment.serverURL;

  settings = {
    pager: {
      display: true,
      perPage: this.defaultRowPerPage,
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
      product_sys_id: {
        title: "ID",
        sortDirection: "desc",
      },
      // category_name: {
      //   title: "Category",
      //   type: "string",
      //   editable: false,
      // },
      // group_name: {
      //   title: "Group",
      //   type: "string",
      //   editable: false,
      // },
      // type_name: {
      //   title: "Type",
      //   type: "string",
      //   editable: false,
      // },
      // brand_name: {
      //   title: "Brand",
      //   type: "string",
      // },
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
        valuePrepareFunction: (avatar) => {
          return `<img class='table-thumbnail-img' src="${avatar}" height="100" width="100"/>`;
        },
      },
    },
  };
  masterProduct: LocalDataSource = new LocalDataSource();
  constructor(private masterService: MasterService, private formBuilder: FormBuilder) {
    this.find_form = this.formBuilder.group({
      group_sys_id: new FormControl("", [Validators.required]),
      category_sys_id: new FormControl("", [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.loadDataMaster();
    this.loadDataGroup();
    this.loadDataCategory();
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

  loadDataGroup() {
    this.masterService.getMasterGroup().subscribe(
      (res: any) => {
        this.masterGroup = res;
      },
      (error) => {
        console.log("error" + error.status);
      }
    );
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


  onselectedGroup(event) {
    console.log(event);
    console.log(event.target);
    
    const value = event;
    this.selectedGroup = value;
    console.log("the selectedGroup is " + value);
    this.loadfindSomeProduct();
  }
  loadfindSomeProduct() {
    console.log("===== loadfindGroup =====");
    console.log(this.selectedGroup);
    console.log("===== loadfindGroup =====");
    
    this.masterService.getSomeProduct(this.selectedGroup).subscribe(
      (res: any) => {
        console.log(res);
        
        this.findSomeProduct = res;
        console.log("find Group " + this.findSomeProduct);
      },
      (error) => {
        Swal.fire("Error!", "error : " + error.status, "error");
      }
    );
  }


}
