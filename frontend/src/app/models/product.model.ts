export interface ProductModelServer {
    id: Number;
    name: String;
    category: String;
    description: String;
    image: String;
    price: Number;
    quantity: Number;
    images: String;
  }
  
  
  export interface serverResponse  {
    count: number;
    products: ProductModelServer[]
  };
  

  export interface ProductsAll {
  
       product_sys_id: number;
       category_sys_id: number;
       group_sys_id: number;
       type_sys_id: number;
       brand_sys_id: number;
       name:string;
       detail: string;
       amount: number;
       price: number;
       file: string;
       isvoid: boolean;
       count: number;

    };
  