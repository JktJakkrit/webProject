import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ManagementComponent } from './management/management.component';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'smart-table',
      component: SmartTableComponent,
    },
    {
      path: 'tree-grid',
      component: TreeGridComponent,
    },
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
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  TreeGridComponent,
  ProductBrandComponent,
  ManagementComponent,
  ProductComponent,
  CategoryComponent,
];
