import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { Subscription } from 'rxjs';
import { SystemService } from '../../../service/system.service';
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
  loggedInUserName: string = '';
  isAdmin: boolean = false;
  constructor(private userSvc: UserService, private sysSvc: SystemService) {}

  ngOnInit(): void {
    this.loggedInUserName = this.sysSvc.loggedInUser.firstName;
    this.sysSvc.checkLogin();
    this.isAdmin = this.sysSvc.loggedInUser.admin === true;
    this.subscription = this.userSvc.list().subscribe((resp) => {
      this.users = resp;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  deleteUser(id: number): void {
    this.userSvc.delete(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }
}
