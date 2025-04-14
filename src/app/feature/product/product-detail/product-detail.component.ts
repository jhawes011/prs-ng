import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { SystemService } from '../../../service/system.service';
@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  title: string = 'Product Detail';
  productId!: number;
  product: Product = new Product();
  subscription!: Subscription;
  loggedInUserName: string = '';
  constructor(
    private productSvc: ProductService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private sysSvc: SystemService
  ) {}
  ngOnInit(): void {
    this.loggedInUserName = this.sysSvc.loggedInUser.firstName;
    this.sysSvc.checkLogin();
    this.actRoute.params.subscribe((params) => {
      this.productId = params['id'];

      this.subscription = this.productSvc.getById(this.productId).subscribe({
        next: (resp) => {
          this.product = resp;
        },
        error: (err) => {
          console.error('Error retrieving product: ', err);
        },
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  delete() {
    this.productSvc.delete(this.productId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/product-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
