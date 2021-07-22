export class DataUser{
    public name: string;
    public email: string;
    public address: string;
    public city: number;
    public phone: string;
    public state: number;
    public sub: number;
    public zip: number;
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