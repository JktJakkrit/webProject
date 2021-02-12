import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../@core/data/smart-table";
import { MasterService } from "../../../_services/master.service";
import Swal from "sweetalert2";
import { NbDialogService } from "@nebular/theme";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

declare let $: any;
@Component({
  selector: "ngx-smart-table",
  templateUrl: "./smart-table.component.html",
  styleUrls: ["./smart-table.component.scss"],
})
export class SmartTableComponent implements OnInit {
  categoty_add_form: FormGroup;
  deleteCategory;
  category_edit_form: FormGroup;
  private url = environment.serverURL;
  settings = {
    
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
      category_sys_id: {
        title: "ID",
        type: "number",
      },
      category_name: {
        title: "Category",
        type: "string",
      },
      // isvoid: {
      //   title: "Status",
      //   type: "string",
      // },
    },
  };

  category_option: LocalDataSource = new LocalDataSource();

  constructor(
    private masterService: MasterService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private http: HttpClient
  ) {
    this.categoty_add_form = this.formBuilder.group({
      category_name: new FormControl("", [Validators.required]),
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
        this.category_option = res;
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
      category_name: event.newData.category_name,
      status: event.newData.status,
    };
    this.http.post<any>(this.url + "/category/post", data).subscribe(
      (res) => {
        console.log(res);
        event.confirm.resolve(event.newData);
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
      category_sys_id: event.newData.category_sys_id,
      category_name: event.newData.category_name,
      status: event.newData.status,
    };
    this.http
      .put<any>(this.url + "/category/edit/" + event.newData.category_sys_id, data)
      .subscribe(
        (res) => {
          console.log(res);
          event.confirm.resolve(event.newData);
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
