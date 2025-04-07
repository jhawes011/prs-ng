import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
@Component({
  selector: 'app-user-create',
  standalone: false,
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent implements OnInit, OnDestroy {
  title: string = 'User Create';
  newUser: User = new User();
  subscription!: Subscription;
  birthDate: string = 'YYYY-MM-DD';
  constructor(private userSvc: UserService, private router: Router) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addUser(): void {
    this.subscription = this.userSvc.add(this.newUser).subscribe((resp) => {
      this.router.navigateByUrl('/user-list');
    });
  }
  // validateBirthDate(): boolean {
  //   const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  //   return dateRegex.test(this.birthDate);
  // }
}
