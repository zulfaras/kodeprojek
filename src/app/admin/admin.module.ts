import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialDesign } from '../material/material';
import { ImagesComponent } from './images/images.component';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

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
        path:'images',
        component:ImagesComponent
      },
      {
        path:'product',
        component:ProductComponent
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
  declarations: [AdminComponent, DashboardComponent, ImagesComponent,ProductComponent,ProductDetailComponent, FileUploaderComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialDesign,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
