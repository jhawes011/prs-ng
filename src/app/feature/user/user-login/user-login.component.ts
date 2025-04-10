import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';
import { UserLogin } from '../../../model/user-login';
@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent implements OnInit, OnDestroy {
  title: string = 'User Login';
  userName: string = '';
  password: string = '';
  subscription!: Subscription;
  message: string = '';
  user!: User;
  userLogin: UserLogin = new UserLogin();
  constructor(
    private userSvc: UserService,
    private router: Router,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.userName = '';
    this.password = '';
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  login() {
    this.subscription = this.userSvc.login(this.userLogin).subscribe({
      next: (resp: any) => {
        console.log('Login successful!', resp);
        this.sysSvc.loggedInUser = resp;

        this.router.navigateByUrl('/request-list');
      },
      error: (err: any) => {
        console.error('Login failed:', err);
        this.message = 'Invalid login - Please check username and password';
      },
    });
  }
}
