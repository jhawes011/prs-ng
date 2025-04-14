import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
const URL = 'http://localhost:8080/api';
@Injectable({
  providedIn: 'root',
})
export class SystemService {
  loggedInUser: User = new User();
  admin: boolean = false;
  reviewer: boolean = false;

  constructor(private router: Router) {}
  checkAdmin(admin: boolean): void {
    if (this.loggedInUser.admin !== true) {
      alert('-------- Unauthorized access ---------');
      this.router.navigateByUrl('/user-login');
    }
  }
  checkReviewer(reviewer: boolean): void {
    if (this.loggedInUser.reviewer !== true) {
      this.router.navigateByUrl('/login');
    }
  }
  checkLogin(): void {
    if (this.loggedInUser.id == 0) {
      alert('-------- Please login ---------');
      this.router.navigateByUrl('/user-login');
    }
  }
  // logout(): void {
  //   this.loggedInUser = new User();
  //   this.admin = false;
  //   this.reviewer = false;
  //   this.router.navigateByUrl('/user-login');
  //   alert('-------- You logged out ---------');
  // }
  // isAdminOrOwner(resourceUserId: number): boolean {
  //   return (
  //     this.loggedInUser.id === resourceUserId ||
  //     this.loggedInUser.admin === true
  //   );
  // }

  // checkAccess(loggedInUser: number): boolean {
  //   const hasAccess = this.isAdminOrOwner(loggedInUser);

  //   if (!hasAccess) {
  //     alert('Unauthorized: You can only edit your own data');
  //     this.router.navigateByUrl('/request-list');
  //   }

  //   return hasAccess;
  // }
}
