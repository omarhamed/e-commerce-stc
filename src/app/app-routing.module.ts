import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductNewComponent } from './components/product-new/product-new.component';
import { ProductGuard } from './services/product.guard';
import { LogoutComponent } from './auth/logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'products',
    component: ProductComponent,
    canActivate: [ProductGuard],
  },
  {
    path: 'products/new',
    component: ProductNewComponent,
    canActivate: [ProductGuard],
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [ProductGuard],
  },
  {
    path: 'products/category/:category',
    component: ProductComponent,
    canActivate: [ProductGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [ProductGuard],
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
