import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from 'app/admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from 'app/admin/components/admin-orders/admin-orders.component';
import { AdminAuthGuardService } from 'app/admin/services/admin-auth-guard.service';
import { ProductFormComponent } from 'app/admin/components/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'app/shared/services/auth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService]}]),

  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    

  ],
  providers: [
    AdminAuthGuardService,
  ]
})
export class AdminModule { }
