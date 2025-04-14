import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/line-item.service';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../model/product';
import { SystemService } from '../../../service/system.service';
@Component({
  selector: 'app-lineitem-create',
  standalone: false,
  templateUrl: './lineitem-create.component.html',
  styleUrl: './lineitem-create.component.css',
})
export class LineitemCreateComponent implements OnInit, OnDestroy {
  title: string = 'Line Item Create';
  newLineItem: LineItem = new LineItem();
  subscription!: Subscription;
  products!: Product[];
  requestId!: number;
  loggedInUserId!: number;
  loggedInUserName!: string;
  constructor(
    private lineItemSvc: LineItemService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private productSvc: ProductService,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.subscription = this.actRoute.params.subscribe((params) => {
      this.requestId = params['id'];
    });
    this.subscription = this.productSvc.list().subscribe({
      next: (resp) => {
        this.products = resp;
        this.loggedInUserId = this.sysSvc.loggedInUser.id;
        this.loggedInUserName = this.sysSvc.loggedInUser.firstName;
      },
      error: (err) => {
        console.error('Error retrieving products:', err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  add(): void {
    const lineItemToPost: LineItem = {
      id: 0,
      request: {
        id: this.requestId,
        user: {
          id: 0,
          firstName: '',
          lastName: '',
        },
        requestNumber: '',
        description: '',
        justification: '',
        dateNeeded: new Date(),
        deliveryMode: '',
        status: '',
        total: 0,
        submittedDate: new Date(),
        reasonForRejection: '',
      },
      product: this.newLineItem.product,
      quantity: this.newLineItem.quantity,
      requestId: this.requestId,
    };

    this.subscription = this.lineItemSvc.add(lineItemToPost).subscribe({
      next: () => {
        this.router.navigateByUrl(`/request-lines/${this.requestId}`);
      },
      error: (err) => {
        console.error('Error adding line item:', err);
      },
    });
  }
}
