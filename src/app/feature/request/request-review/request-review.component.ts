import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-request-review',
  standalone: false,
  templateUrl: './request-review.component.html',
  styleUrl: './request-review.component.css',
})
export class RequestReviewComponent implements OnInit, OnDestroy {
  title: string = 'Request Review';
  requests!: Request[];
  requestId!: number;
  subscription!: Subscription;
  constructor(private requestSvc: RequestService, private router: Router) {}
  ngOnInit(): void {
    this.subscription = this.requestSvc.getListReview(3).subscribe((resp) => {
      this.requests = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  submitReview(request: Request) {
    this.requestSvc.submitReview(this.requestId).subscribe({
      next: () => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.error('Error submitting review:', err);
      },
    });
  }
}
