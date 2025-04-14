import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemService } from '../../../service/system.service';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request.service';
import { Request } from '../../../model/request';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/line-item.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-request-audit',
  standalone: false,
  templateUrl: './request-audit.component.html',
  styleUrl: './request-audit.component.css',
})
export class RequestAuditComponent implements OnInit, OnDestroy {
  Title: string = 'Request Audit';
  requestId!: number;
  request: Request = new Request();
  lineItems!: LineItem[];
  subscription!: Subscription;
  loggedInUserName: string = '';
  reasonForRejection: string = '';
  status: string = '';
  constructor(
    private requestSvc: RequestService,
    private sysSvc: SystemService,
    private lineItemService: LineItemService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUserName = this.sysSvc.loggedInUser.firstName;
    this.sysSvc.checkLogin();
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

      this.subscription = this.lineItemService
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
    this.subscription.unsubscribe();
  }
  approve(requestId: number): void {
    this.requestSvc.approve(requestId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-review');
      },
      error: (err) => {
        console.error('Error approving request:', err);
      },
    });
  }
  reject(requestId: number): void {
    this.requestSvc.reject(requestId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-review');
      },
      error: (err) => {
        console.error('Error rejecting request:', err);
      },
    });
  }
}
