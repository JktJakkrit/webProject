import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
// import { FsIconComponent } from './tree-grid/tree-grid.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ManagementComponent } from './management/management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { GroupComponent } from './group/group.component';



@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ...routedComponents,
    // FsIconComponent,
    CategoryComponent,
    ProductComponent,
    ProductTypeComponent,
    ManagementComponent,
    ProductBrandComponent,
    GroupComponent,
  
    
  ],
})
export class TablesModule { }
