import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { SystemService } from '../../../service/system.service';
@Component({
  selector: 'app-vendor-detail',
  standalone: false,
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor-detail.component.css',
})
export class VendorDetailComponent implements OnInit, OnDestroy {
  title: string = 'Vendor Detail';
  vendorId!: number;
  vendor: Vendor = new Vendor();
  subscription!: Subscription;
  loggedInUserName: string = '';
  isAdmin: boolean = false;

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.loggedInUserName = this.sysSvc.loggedInUser.firstName;
    this.sysSvc.checkLogin();
    this.isAdmin = this.sysSvc.loggedInUser.admin === true;
    this.actRoute.params.subscribe((params) => {
      this.vendorId = params['id'];

      this.subscription = this.vendorSvc.getById(this.vendorId).subscribe({
        next: (resp) => {
          this.vendor = resp;
        },
        error: (err) => {
          console.error('Error retrieving vendor: ', err);
        },
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  delete() {
    this.vendorSvc.delete(this.vendorId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/vendor-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
