import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class MasterService {
  private url = environment.serverURL;
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getMasterCatagory() {
    return this.http.get<any>(this.url + "/category/all");
  }
  getMasterGroup() {
    return this.http.get<any>(this.url + "/group/all");
  }
  getMasterProduct() {
    const newParams = new HttpParams();
    // .set('catagory_sys_id', categoty_sys_id)
    return this.http.get<any>(this.url + "/product/all");
  }
  getMasterType() {
    const newParams = new HttpParams();
    // .set('product_sys_id', product_sys_id)
    return this.http.get<any>(this.url + "/type/all");
  }
  getMasterManage() {
    return this.http.get<any>(this.url + "/manage/all");
  }
  getMasterBrand() {
    return this.http.get<any>(this.url + "/brand/all");
  }
  addMasterCategory(category_name: string) {
    var isvoid = 0;
    const body = {
      category_name,
      isvoid,
    };
    return this.http
    .post<any>(this.url + "/category/post", body)
    .pipe(catchError(this.handleError));

  }
  addMasterGroup( group_name: string, category_sys_id: string, avatar: File) {
    // var isvoid = 0;
    // const body = {
    //   category_sys_id,
    //   group_name,
    //   isvoid,
    // };
    var isvoid = 0;
    // const body = {
    //   category_sys_id,
    //   product_name,
    //   isvoid,
    // };
    console.log("รูปจ้า....รูป", avatar);
    var f = new FormData();
    
    f.append("group_name", group_name);
    f.append("category_sys_id", category_sys_id);
    f.append("avatar", avatar, avatar.name);
    f.append("isvoid", isvoid.toFixed());
    f.forEach((v, k) => {
      console.log(k, " :  ", v);
    });
    return this.http
      .post<any>(this.url + "/group/post", f)
      .pipe(catchError(this.handleError));
  }

  addMasterProduct(
    category_sys_id: string,
    group_sys_id: string,
    type_sys_id: string,
    brand_sys_id: string,
    name: string,
    detail: string,
    price: string,
    amount: string,
    avatar: File
  ) {
    var isvoid = 0;
    // const body = {
    //   category_sys_id,
    //   product_name,
    //   isvoid,
    // };
    console.log("รูปจ้า....รูป", avatar);
    var f = new FormData();
    f.append("category_sys_id", category_sys_id);
    f.append("group_sys_id", group_sys_id);
    f.append("type_sys_id", type_sys_id);
    f.append("brand_sys_id", brand_sys_id);
    f.append("name", name);
    f.append("detail", detail);
    f.append("price", price);
    f.append("amount", amount);
    f.append("avatar", avatar, avatar.name);
    f.append("isvoid", isvoid.toFixed());
    f.forEach((v, k) => {
      console.log(k, " :  ", v);
    });

    return this.http
      .post<any>(this.url + "/product/post", f)
      .pipe(catchError(this.handleError));
  }

  addMasterType( type_name: string, category_sys_id: string, group_sys_id: string) {
    var isvoid = 0;
    const body = {
      type_name,
      category_sys_id,
      group_sys_id,
      
      isvoid,
    };
    return this.http
      .post<any>(this.url + "/type/post", body)
      .pipe(catchError(this.handleError));
  }

  addMasterManage(
    product_sys_id: string,
    mn_name: string,
    mn_detail: string,
    mn_price: string,
    mn_amount: string,
    avatar: File
  ) {
    var isvoid = 0;
    console.log("รูปจ้า....รูป", avatar);
    var f = new FormData();
    f.append("product_sys_id", product_sys_id);
    f.append("mn_name", mn_name);
    f.append("mn_detail", mn_detail);
    f.append("mn_price", mn_price);
    f.append("mn_amount", mn_amount);
    f.append("avatar", avatar, avatar.name);
    f.append("isvoid", isvoid.toFixed());
    f.forEach((v, k) => {
      console.log(k, " :  ", v);
    });

    return this.http
      .post<any>(this.url + "/manage/post", f)
      .pipe(catchError(this.handleError));
  }

  addMasterBrand(product_sys_id: string, brand_name: string) {
    var isvoid = 0;
    const body = {
      // product_sys_id,
      brand_name,
      isvoid,
    };
    return this.http
      .post<any>(this.url + "/brand/post", body)
      .pipe(catchError(this.handleError));
  }
  updateMasterCategory(category_sys_id: string, category_name: string, avatar: File, isvoid) {
    const body = {
      category_sys_id,
      category_name,
      avatar,
      isvoid,
    };
    var f = new FormData();
    f.append("category_sys_id",category_sys_id);
    f.append("category_name",category_name);
    f.append("avatar",avatar, avatar.name);
    f.append("isvoid",isvoid.toFixed());

    f.forEach((v, k)=>{
      console.log(k, " : ",v);
      
    });
    var REST_URL = this.url + "/category/edit/" + category_sys_id;
    return this.http
      .put<any>(REST_URL, f)
      .pipe(catchError(this.handleError));
  }

  updateMasterGroup(
    group_sys_id: string, 
    group_name: string, 
    category_sys_id: string, 
    avatar: File,
    isvoid
    ){
      const body = {
        group_sys_id,
        group_name,
        category_sys_id,
        avatar,
        isvoid,
      }
    var f = new FormData();
    f.append("group_sys_id", group_sys_id);
    f.append("group_name", group_name);
    f.append("category_sys_id", category_sys_id);
    f.append("avatar", avatar, avatar.name);
    f.append("isvoid", isvoid.toFixed());
    f.forEach((v, k) => {
      console.log(k, " :  ", v);
    });

    var REST_URL = this.url + "/group/edit/" + group_sys_id;
    return this.http
      .put<any>(REST_URL, f)
      .pipe(catchError(this.handleError));
    
  }
  updateMasterProduct(
    product_sys_id: string,
    category_sys_id: string,
    group_sys_id: string,
    type_sys_id: string,
    brand_sys_id: string,
    name: string,
    detail: string,
    price: string,
    amount: string,
    avatar: File,
    isvoid
  ) {
    const body = {
      product_sys_id,
      category_sys_id,
      group_sys_id,
      type_sys_id,
      brand_sys_id,
      name,
      detail,
      price,
      amount,
      avatar,
      isvoid
    };
    var f = new FormData();
    f.append("product_sys_id", product_sys_id);
    f.append("name", name);
    f.append("category_sys_id", category_sys_id);
    f.append("group_sys_id", group_sys_id);
    f.append("type_sys_id", type_sys_id);
    f.append("brand_sys_id", brand_sys_id);
    f.append("detail", detail);
    f.append("price", price);
    f.append("amount", amount);
    f.append("avatar", avatar, avatar.name);
    f.append("isvoid", isvoid.toFixed());
    f.forEach((v, k) => {
      console.log(k, " :  ", v);
    });
    var REST_URL = this.url + "/product/edit/" + product_sys_id;
    return this.http.put<any>(REST_URL, f).pipe(catchError(this.handleError));
  }

  updateMasterType(
    type_sys_id: string,
    type_name: string,
    category_sys_id,
    group_sys_id,
    isvoid
  ) {
    const body = {
      type_sys_id,
      type_name,
      category_sys_id,
      group_sys_id,
      isvoid,
    };
    var REST_URL = this.url + "/type/edit/" + type_sys_id;
    return this.http
      .put<any>(REST_URL, body)
      .pipe(catchError(this.handleError));
  }

  updateMasterManage(
    mn_sys_id: string,
    product_sys_id: string,
    mn_name: string,
    mn_detail: string,
    mn_price: string,
    mn_amount: string,
    avatar: File,
    isvoid
  ) {
    var f = new FormData();
    f.append("product_sys_id", product_sys_id);
    f.append("mn_name", mn_name);
    f.append("mn_detail", mn_detail);
    f.append("mn_price", mn_price);
    f.append("mn_amount", mn_amount);
    f.append("avatar", avatar, avatar.name);
    f.append("isvoid", isvoid.toFixed());
    f.forEach((v, k) => {
      console.log(k, " :  ", v);
    });
    var REST_URL = this.url + "/manage/edit/" + mn_sys_id;
    return this.http.put<any>(REST_URL, f).pipe(catchError(this.handleError));
  }

  deleteMasterCategory(category_sys_id: string) {
    var REST_URL = this.url + "/category/id/" + category_sys_id;
    return this.http.delete<any>(REST_URL).pipe(catchError(this.handleError));
  }

  deleteMasterProduct(product_sys_id: string) {
    var REST_URL = this.url + "/product/id/" + product_sys_id;
    return this.http.delete<any>(REST_URL).pipe(catchError(this.handleError));
  }

  deleteMasterType(type_sys_id: string) {
    var REST_URL = this.url + "/type/id/" + type_sys_id;
    return this.http.delete<any>(REST_URL).pipe(catchError(this.handleError));
  }

  deleteMasterManage(type_sys_id: string) {
    var REST_URL = this.url + "/type/id/" + type_sys_id;
    return this.http.delete<any>(REST_URL).pipe(catchError(this.handleError));
  }

  // --------------select find----------------
  
  getGroup(value) {
    return this.http.post<any>(this.url + "/find/group", {
      category_sys_id: value,
    });
  }
  getType(value) {
    return this.http.post<any>(this.url + "/find/type", {
      group_sys_id: value,
    });
  }
}
