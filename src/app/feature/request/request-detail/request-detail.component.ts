import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
@Component({
  selector: 'app-request-detail',
  standalone: false,
  templateUrl: './request-detail.component.html',
  styleUrl: './request-detail.component.css',
})
export class RequestDetailComponent implements OnInit, OnDestroy {
  title: string = 'Request Detail';
  requestId!: number;
  request!: Request;
  subscription!: Subscription;
  userId!: number;
  user!: User;
  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private userSvc: UserService
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      this.requestId = params['id'];

      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) => {
          this.request = resp;
          console.log('Request: ', this.request);
        },
        error: (err) => {
          console.error('Error retrieving request: ', err);
        },
      });
      this.subscription = this.userSvc.getById(this.request.user.id).subscribe({
        next: (resp) => {
          this.user = resp;
          console.log('User: ', this.user);
        },
        error: (err) => {
          console.error('Error retrieving user: ', err);
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  delete() {
    this.requestSvc.delete(this.requestId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.log('Error deleting request: ', err);
      },
    });
  }
}
