import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { Subscription } from 'rxjs';
import { VendorService } from '../../../service/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-edit',
  standalone: false,
  templateUrl: './vendor-edit.component.html',
  styleUrl: './vendor-edit.component.css',
})
export class VendorEditComponent implements OnInit, OnDestroy {
  title: string = 'Vendor Edit';
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

  save() {
    this.vendorSvc.update(this.vendor).subscribe({
      next: (resp) => {
        this.vendor = resp;
        this.router.navigateByUrl('/vendor-list');
      },
      error: (err) => {
        console.error('Error updating vendor: ', err);
      },
    });
  }
}
