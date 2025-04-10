import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/line-item.service';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
@Component({
  selector: 'app-lineitem-edit',
  standalone: false,
  templateUrl: './lineitem-edit.component.html',
  styleUrl: './lineitem-edit.component.css',
})
export class LineitemEditComponent implements OnInit, OnDestroy {
  title: string = 'Line Item Edit';
  lineItemId!: number;
  lineItem: LineItem = new LineItem();
  subscription!: Subscription;
  products!: Product[];
  requestId!: number;
  constructor(
    private lineItemSvc: LineItemService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private productSvc: ProductService
  ) {}
  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      this.lineItemId = params['id'];

      this.subscription = this.lineItemSvc.getById(this.lineItemId).subscribe({
        next: (resp) => {
          this.lineItem = resp;
          this.requestId = this.lineItem.request.id;

          this.productSvc.list().subscribe({
            next: (resp) => {
              this.products = resp;
            },
            error: (err) => {
              console.error('Error retrieving products:', err);
            },
          });
        },
        error: (err) => {
          console.error('Error retrieving line item:', err);
        },
      });
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  save(): void {
    this.lineItemSvc.update(this.lineItem).subscribe({
      next: () => {
        this.router.navigateByUrl('/request-lines/' + this.lineItem.request.id);
      },
      error: (err) => {
        console.error('Error saving line item:', err);
      },
    });
  }
}
