import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { SystemService } from '../../../service/system.service';
@Component({
  selector: 'app-vendor-create',
  standalone: false,
  templateUrl: './vendor-create.component.html',
  styleUrl: './vendor-create.component.css',
})
export class VendorCreateComponent implements OnInit, OnDestroy {
  title: string = 'Vendor Create';
  newVendor: Vendor = new Vendor();
  subscription!: Subscription;
  loggedInUserName: string = '';
  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.loggedInUserName = this.sysSvc.loggedInUser.firstName;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addVendor(): void {
    this.subscription = this.vendorSvc.add(this.newVendor).subscribe((resp) => {
      this.router.navigateByUrl('/vendor-list');
    });
  }
}
