import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { SystemService } from '../../../service/system.service';
@Component({
  selector: 'app-vendor-list',
  standalone: false,
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css',
})
export class VendorListComponent implements OnInit, OnDestroy {
  title: string = 'Vendor List';
  vendors!: Vendor[];
  subscription!: Subscription;
  loggedInUserName: string = '';
  isAdmin: boolean = false;
  constructor(
    private vendorSvc: VendorService,
    private sysSvc: SystemService
  ) {}
  ngOnInit(): void {
    this.loggedInUserName = this.sysSvc.loggedInUser.firstName;
    this.sysSvc.checkLogin();
    this.isAdmin = this.sysSvc.loggedInUser.admin;
    this.subscription = this.vendorSvc.list().subscribe((resp) => {
      this.vendors = resp;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
