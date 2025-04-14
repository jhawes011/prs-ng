import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { SystemService } from '../../../service/system.service';
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
  loggedInUser: string = '';
  isAdmin: boolean = false;
  constructor(
    private productSvc: ProductService,
    private sysSvc: SystemService
  ) {}
  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser.firstName;

    this.sysSvc.checkLogin();
    this.isAdmin = this.sysSvc.loggedInUser.admin === true;

    this.subscription = this.productSvc.list().subscribe((resp) => {
      this.products = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
