import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit, OnDestroy {
  title: string = 'Product List';
  products!: Product[];
  subscription!: Subscription;
  constructor(private productSvc: ProductService) {}
  ngOnInit(): void {
    this.subscription = this.productSvc.list().subscribe((resp) => {
      this.products = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
