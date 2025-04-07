import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit, OnDestroy {
  title: string = 'Product Edit';
  productId!: number;
  product!: Product;
  subscription!: Subscription;

  constructor(
    private productSvc: ProductService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
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

  save() {
    this.productSvc.update(this.product).subscribe({
      next: (resp) => {
        this.product = resp;
        this.router.navigateByUrl('/product-list');
      },
      error: (err) => {
        console.error('Error updating product: ', err);
      },
    });
  }
}
