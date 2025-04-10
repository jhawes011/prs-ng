import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';
import { SystemService } from '../../service/system.service';
@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  title: string = 'PRS';
  menuItems: MenuItem[] = [];
  loggedInUserName: string = '';

  constructor(private sysSvc: SystemService) {}
  ngOnInit(): void {
    this.menuItems = [
      new MenuItem('User', '/user-list', 'User List'),
      new MenuItem('Vendor', '/vendor-list', 'Vendor List'),
      new MenuItem('Product', '/product-list', 'Product List'),

      new MenuItem('Request', '/request-list', 'Request List'),
      new MenuItem('Review', '/request-review', 'Review List'),

      new MenuItem('Login', '/user-login', 'User Login'),
    ];
    if (this.sysSvc.loggedInUser != null) {
      this.loggedInUserName = this.sysSvc.loggedInUser.firstName;
    }
  }
}
