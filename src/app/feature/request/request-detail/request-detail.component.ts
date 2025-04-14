import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';
@Component({
  selector: 'app-request-detail',
  standalone: false,
  templateUrl: './request-detail.component.html',
  styleUrl: './request-detail.component.css',
})
export class RequestDetailComponent implements OnInit, OnDestroy {
  title: string = 'Request Detail';
  requestId!: number;
  request: Request = new Request();
  subscription!: Subscription;
  userId!: number;
  user!: User;
  loggedInUser: string = '';
  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private userSvc: UserService,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser.firstName;
    this.sysSvc.checkLogin();
    this.actRoute.params.subscribe((params) => {
      this.requestId = params['id'];

      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) => {
          this.request = resp;
          console.log('Request: ', this.request);

          if (this.request && this.request.user && this.request.user.id) {
            this.userSvc.getById(this.request.user.id).subscribe({
              next: (userResp) => {
                this.user = userResp;
                console.log('User: ', this.user);
              },
              error: (err) => {
                console.error('Error retrieving user: ', err);
              },
            });
          }
        },
        error: (err) => {
          console.error('Error retrieving request: ', err);
        },
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  delete() {
    this.requestSvc.delete(this.request.id).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
