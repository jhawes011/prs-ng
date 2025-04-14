import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
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
  loggedInUserName: string = '';
  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private sysSvc: SystemService
  ) {}
  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUserName = this.sysSvc.loggedInUser.firstName;
    const loggedInUserId = this.sysSvc.loggedInUser.id;
    this.subscription = this.requestSvc
      .getListReview(loggedInUserId)
      .subscribe((resp) => {
        this.requests = resp;
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
