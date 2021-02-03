export class DataUser{
    public name: string;
    public email: string;
    public address: string;
    public city: string;
    public phone: string;
    public state: string;
    public zip: string;
    public dataProduct: DataProduct[] = [];

    constructor() {
        this.dataProduct.push(new DataProduct());
    }
} 

export class DataProduct{
    public name: string;
    public amout: number;
    public price: number;
    public totalPrice: number;
}