import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { LineitemListComponent } from './feature/lineitem/lineitem-list/lineitem-list.component';
import { LineitemEditComponent } from './feature/lineitem/lineitem-edit/lineitem-edit.component';
import { LineitemCreateComponent } from './feature/lineitem/lineitem-create/lineitem-create.component';
import { LineitemDetailComponent } from './feature/lineitem/lineitem-detail/lineitem-detail.component';
import { RequestListComponent } from './feature/request/request-list/request-list.component';
import { RequestEditComponent } from './feature/request/request-edit/request-edit.component';
import { RequestCreateComponent } from './feature/request/request-create/request-create.component';
import { RequestDetailComponent } from './feature/request/request-detail/request-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserDetailComponent,
    VendorListComponent,
    VendorEditComponent,
    VendorCreateComponent,
    VendorDetailComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    LineitemListComponent,
    LineitemEditComponent,
    LineitemCreateComponent,
    LineitemDetailComponent,
    RequestListComponent,
    RequestEditComponent,
    RequestCreateComponent,
    RequestDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
