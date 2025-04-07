import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';

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
  constructor(private vendorSvc: VendorService) {}
  ngOnInit(): void {
    this.subscription = this.vendorSvc.list().subscribe((resp) => {
      this.vendors = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
