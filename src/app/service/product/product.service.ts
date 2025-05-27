import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productList: Array<Product> = [
    { id: 1, name: 'Pencil', price: 5 },
    { id: 2, name: 'Eraser', price: 3 },
    { id: 3, name: 'Blue Pen', price: 10 },
    { id: 4, name: 'Black Pen', price: 10 },
    { id: 5, name: 'Notebook', price: 50 },
    { id: 6, name: 'Big Notebook', price: 80 },
    { id: 7, name: 'Small Notebook', price: 30 },
    { id: 8, name: 'Highlighter', price: 15 },
    { id: 9, name: 'Marker', price: 20 },
    { id: 10, name: 'Stapler', price: 25 },
    { id: 11, name: 'Sharpener', price: 5 },
    { id: 12, name: 'Ruler', price: 8 },
    { id: 13, name: 'Glue Stick', price: 10 },
    { id: 14, name: 'Scissors', price: 30 },
    { id: 15, name: 'Calculator', price: 150 },
    { id: 16, name: 'Pen Stand', price: 40 },
    { id: 17, name: 'Paper Clips', price: 12 },
    { id: 18, name: 'Crayons', price: 20 },
    { id: 19, name: 'Sketch Pens', price: 30 },
    { id: 20, name: 'Post-it Notes', price: 15 },
  ];

  constructor() {}

  getProductList(): Product[] {
    return this.productList;
  }

 createOrder(order: Product[]) {
  const previousOrders = localStorage.getItem('orders');
  let allOrders = previousOrders ? JSON.parse(previousOrders) : [];
  allOrders = [...allOrders, ...order];
  localStorage.setItem('orders', JSON.stringify(allOrders));
}

  getOrderdItems(username:string): Product[] {
    let orders = localStorage.getItem('orders');
    if (orders) {
      let parsedData= JSON.parse(orders);
      return parsedData.filter((data:any,index:number)=>data.username===username)
    } else {
      return [];
    }
  }
}
