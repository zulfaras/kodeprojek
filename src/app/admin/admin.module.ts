import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialDesign } from '../material/material';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { PinjamComponent } from './pinjam/pinjam.component';
import { PinjamDetailComponent } from './pinjam-detail/pinjam-detail.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'product',
        component:ProductComponent
      },
      {
        path:'pinjam',
        component:PinjamComponent
      },
      {
        path:'',
        pathMatch:'full',
        redirectTo:'/admiin/dashboard'
      }
    ]
  }
]

@NgModule({
  declarations: [AdminComponent, DashboardComponent,ProductComponent,ProductDetailComponent, PinjamComponent, PinjamDetailComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialDesign,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
