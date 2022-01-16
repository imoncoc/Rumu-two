export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;

  constructor(id: string, name:string, description:string = '', price:number = 0, stock:number = 0, imageUrl:any = 'assets/Image/images.jpg'){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.stock = stock;
  }
}
