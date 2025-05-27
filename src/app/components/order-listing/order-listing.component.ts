import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../../models/product.model';
import { ProductService } from '../../service/product/product.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { TextToSpeechService } from '../../service/text-to-speech/text-to-speech.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-order-listing',
  standalone: true,
  imports: [RouterModule, CommonModule, MatSortModule, MatTableModule,MatPaginatorModule,DragDropModule,HttpClientModule],
  templateUrl: './order-listing.component.html',
  styleUrl: './order-listing.component.css',
})
export class OrderListingComponent {
  displayedColumns: string[] = ['Sr', 'item', 'quantity'];
  dataSource = new MatTableDataSource<Product>();
  username!:string
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService,private textToSpeechService:TextToSpeechService) {
    const user=localStorage.getItem('username')
    if(user){
      this.username=JSON.parse(user)
    }
  }

  ngOnInit(): void {
    this.getOrderdItems();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }

   dropTable(event: any) {
    const prevData = this.dataSource.data.slice();
    moveItemInArray(prevData, event.previousIndex, event.currentIndex);
    this.dataSource.data = prevData;
  }

  getOrderdItems() {
    this.dataSource.data = this.productService.getOrderdItems(this.username);
    console.log(this.dataSource.data)
  }

 orderStatus() {
  let message = 'Your order list includes: ';
  this.dataSource.data.forEach((item:any, index:number) => {
    message += `Item ${index + 1}: ${item.item}, Quantity: ${item.quantity}. `;
  });
  message+=`Thank you for shooping , We will deliver your order soon...`
  this.textToSpeechService.speakText(message);
}

  
}
