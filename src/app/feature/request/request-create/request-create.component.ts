import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
@Component({
  selector: 'app-request-create',
  standalone: false,
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.css',
})
export class RequestCreateComponent implements OnInit, OnDestroy {
  title: string = 'Request Create';
  newRequest: Request = new Request();
  reasonForRejection: string = 'null';
  subscription!: Subscription;
  loggedInUserName: string = '';

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.loggedInUserName = this.sysSvc.loggedInUser.firstName;
    this.sysSvc.checkLogin();

    this.newRequest.user = this.sysSvc.loggedInUser;

    this.newRequest.status = 'New';
    this.newRequest.total = 0;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addRequest(): void {
    this.subscription = this.requestSvc
      .add(this.newRequest)
      .subscribe((resp) => {
        this.router.navigateByUrl('/request-list');
      });
  }
}
