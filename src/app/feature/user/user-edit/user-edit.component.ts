import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnInit, OnDestroy {
  title: string = 'User Edit';
  userId!: number;
  user!: User;
  subscription!: Subscription;

  constructor(
    private userSvc: UserService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      this.userId = params['id'];

      this.subscription = this.userSvc.getById(this.userId).subscribe({
        next: (resp) => {
          this.user = resp;
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

  save() {
    this.userSvc.update(this.user).subscribe({
      next: (resp) => {
        this.user = resp;
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.error('Error updating user: ', err);
      },
    });
  }
}
