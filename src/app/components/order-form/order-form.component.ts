import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../service/product/product.service';
import { MatPaginator } from '@angular/material/paginator';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../service/snackbart/snackbar.service';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatPaginatorModule,
    RouterModule,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent {
  productList: Product[] = [];
  filteredOptions: string[][] = [];
  orderForm!: FormGroup;
  columns: Array<string> = ['Sr No', 'Item', 'Quantity','Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 5;
  pageIndex = 0;
  username!: string;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private snackBarService: SnackbarService,
    private authService: AuthService
  ) {
    const user = localStorage.getItem('username');
    if (user) {
      this.username = JSON.parse(user);
      console.log(this.username);
    }
  }

  ngOnInit(): void {
    this.productList = this.productService.getProductList();
    this.orderForm = this.fb.group({
      orders: this.fb.array([]),
    });
    this.addItem();
  }

  get orders(): FormArray {
    return this.orderForm.get('orders') as FormArray;
  }

  get pagedOrders() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return this.orders.controls.slice(start, end);
  }

  deleteItem(index:number){
    this.orders.removeAt(index)
  }

  addItem() {
    const orderGroup = this.fb.group({
      item: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      username: [this.username],
    });
    this.orders.push(orderGroup);
    this.filteredOptions.push(this.productList.map((p) => p.name));

    const totalItems = this.orders.length;
    const newPageIndex = Math.floor((totalItems - 1) / this.pageSize);
    this.pageIndex = newPageIndex;
    if (this.paginator) {
      this.paginator.pageIndex = newPageIndex;
    }
  }

  filterProductList(index: number) {
    const input = this.orders.at(index).get('item')?.value?.toLowerCase();
    this.filteredOptions[index] = this.productList
      .map((p) => p.name)
      .filter((name) => name.toLowerCase().includes(input));
  }

  drop(event: any) {
    const prevIndex = this.pageIndex * this.pageSize + event.previousIndex;
    const currentIndex = this.pageIndex * this.pageSize + event.currentIndex;

    moveItemInArray(this.orders.controls, prevIndex, currentIndex);
    moveItemInArray(this.filteredOptions, prevIndex, currentIndex);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
  }

  submitOrder() {
    if (this.orderForm.valid) {
      console.log('Submitted Orders:', this.orderForm.value.orders);
      this.productService.createOrder(this.orderForm.value.orders);
      this.snackBarService.showMessage('Order Placed Successfully....!!!!!');
      this.router.navigate(['/order-listing']);
    } else {
      this.snackBarService.showMessage('Please fill all the Mandatory Fields');
      this.orderForm.markAllAsTouched();
    }
  }

  showOrder() {
    this.router.navigate(['/order-listing']);
  }

  dropColumn(event:any) {
    moveItemInArray(this.columns, event.prevIndex, event.currentIndex);
  }
}
