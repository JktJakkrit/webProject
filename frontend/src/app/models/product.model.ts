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
       category_sys_id: string;
       group_sys_id: string;
       type_sys_id: string;
       brand_sys_id: string;
       name:string;
       detail: string;
       amount: number;
       price: number;
       file: string;
       isvoid: boolean;
       count: number;

    };
  