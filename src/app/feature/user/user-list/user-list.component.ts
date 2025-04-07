import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit, OnDestroy {
  title: string = 'User List';
  users: User[] = [];
  subscription!: Subscription;

  constructor(private userSvc: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userSvc.list().subscribe((resp) => {
      this.users = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  // deleteUser(id: number): void {
  //   this.userService.deleteUser(id).subscribe(() => {
  //     this.users = this.users.filter(user => user.id !== id);
  //   });
  // }
}
