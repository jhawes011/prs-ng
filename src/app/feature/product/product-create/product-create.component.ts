import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { SystemService } from '../../../service/system.service';
@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  title: string = 'Product Create';
  newProduct: Product = new Product();
  vendors!: Vendor[];
  subscription!: Subscription;
  loggedInUserName: string = '';
  isAdmin: boolean = false;
  constructor(
    private productSvc: ProductService,
    private venodrSvc: VendorService,
    private router: Router,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.loggedInUserName = this.sysSvc.loggedInUser.firstName;
    this.sysSvc.checkLogin();

    this.subscription = this.venodrSvc.list().subscribe((resp) => {
      this.vendors = resp;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addProduct(): void {
    this.subscription = this.productSvc
      .add(this.newProduct)
      .subscribe((resp) => {
        this.router.navigateByUrl('/product-list');
      });
  }
}
