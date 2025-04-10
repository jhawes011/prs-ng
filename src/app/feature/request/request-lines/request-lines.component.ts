import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/line-item.service';

@Component({
  selector: 'app-request-lines',
  standalone: false,
  templateUrl: './request-lines.component.html',
  styleUrl: './request-lines.component.css',
})
export class RequestLinesComponent implements OnInit, OnDestroy {
  title: string = 'Request Lines';
  requestId!: number;
  request!: Request;
  lineItems!: LineItem[];
  subscription!: Subscription;

  constructor(
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      this.requestId = params['id'];

      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) => {
          this.request = resp;
        },
        error: (err) => {
          console.error('Error retrieving request:', err);
        },
      });

      this.subscription = this.lineItemSvc
        .getByRequestId(this.requestId)
        .subscribe({
          next: (resp) => {
            this.lineItems = Array.isArray(resp) ? resp : [resp];
          },
          error: (err) => {
            console.error('Error retrieving line items:', err);
          },
        });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  delete(id: number): void {
    this.lineItemSvc.delete(id).subscribe({
      next: () => {
        this.lineItems = this.lineItems.filter((item) => item.id !== id);
      },
      error: (err) => {
        console.error('Error deleting line item:', err);
      },
    });
  }
  submitReview(requestId: number): void {
    this.requestSvc.submitReview(requestId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.error('Error submitting review:', err);
      },
    });
  }
}
