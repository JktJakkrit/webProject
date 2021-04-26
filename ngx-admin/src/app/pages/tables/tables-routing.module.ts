import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ManagementComponent } from './management/management.component';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { GroupComponent } from './group/group.component';
import { ShowProductComponent } from './show-product/show-product.component';


const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
  
    {
      path: 'category',
      component: CategoryComponent,
    },
    {
      path: 'product',
      component: ProductComponent,
    },
    {
      path: 'product-type',
      component: ProductTypeComponent,
    },
    {
      path: 'management',
      component: ManagementComponent,
    },
    {
      path: 'product-brand',
      component: ProductBrandComponent,
    },
    {
      path: 'group',
      component: GroupComponent,
    },
    {
      path: 'show-product',
      component: ShowProductComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  ProductBrandComponent,
  ManagementComponent,
  ProductComponent,
  CategoryComponent,
  ShowProductComponent
];
