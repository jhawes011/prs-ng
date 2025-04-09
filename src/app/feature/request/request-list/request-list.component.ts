import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';

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
  constructor(private requestSvc: RequestService) {}
  ngOnInit(): void {
    this.subscription = this.requestSvc.list().subscribe((resp) => {
      this.requests = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
