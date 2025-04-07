import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  title: string = 'PRS';
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      new MenuItem('User', '/user-list', 'User List'),
      new MenuItem('Vendor', '/vendor-list', 'Vendor List'),
      new MenuItem('Product', '/product-list', 'Product List'),

      new MenuItem('Request', '/request-list', 'Request List'),
      new MenuItem('Review', '/review-list', 'Review List'),

      new MenuItem('Login', '/user-login', 'User Login'),
    ];
  }
}
