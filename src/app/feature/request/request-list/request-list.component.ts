import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css',
})
export class RequestListComponent implements OnInit, OnDestroy {
  title: string = 'Request List';
  requests!: Request[];
  subscription!: Subscription;
  loggedInUserName: string = '';
  constructor(
    private requestSvc: RequestService,
    private sysSvc: SystemService
  ) {}
  ngOnInit(): void {
    this.loggedInUserName = this.sysSvc.loggedInUser.firstName;
    this.sysSvc.checkLogin();
    this.subscription = this.requestSvc.list().subscribe((resp) => {
      this.requests = resp;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
