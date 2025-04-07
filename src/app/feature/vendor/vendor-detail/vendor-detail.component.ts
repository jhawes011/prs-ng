import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-vendor-detail',
  standalone: false,
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor-detail.component.css',
})
export class VendorDetailComponent implements OnInit, OnDestroy {
  title: string = 'Vendor Detail';
  vendorId!: number;
  vendor!: Vendor;
  subscription!: Subscription;

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
    this.subscription.unsubscribe();
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
