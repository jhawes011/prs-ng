import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
@Component({
  standalone: false,

  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrl: './request-edit.component.css',
})
export class RequestEditComponent implements OnInit, OnDestroy {
  title: string = 'Request Edit';
  requestId!: number;
  request: Request = new Request();
  subscription!: Subscription;
  loggedInUserName: string = '';
  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private sysSvc: SystemService
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
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  save(): void {
    this.requestSvc.update(this.request).subscribe({
      next: () => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.error('Error saving request:', err);
      },
    });
  }
}
