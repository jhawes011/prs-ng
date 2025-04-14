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
  reviewer: boolean = false;
  constructor(private sysSvc: SystemService) {}
  ngOnInit(): void {
    this.reviewer = this.sysSvc.loggedInUser.reviewer;
    this.menuItems = [
      new MenuItem('Users', '/user-list', 'User List'),
      new MenuItem('Vendors', '/vendor-list', 'Vendor List'),
      new MenuItem('Products', '/product-list', 'Product List'),
      new MenuItem('Requests', '/request-list', 'Request List'),
    ];

    if (this.reviewer === true) {
      this.menuItems.push(
        new MenuItem('Review', '/request-review', 'Review List')
      );
    }
    this.menuItems.push(new MenuItem('Logout', '/user-login', 'Logout'));
  }
}
