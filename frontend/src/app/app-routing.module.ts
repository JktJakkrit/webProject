import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// -----------------Managements-----------------------------------
import { ManageAirComponent } from './components/admin/manage-air/manage-air.component';
import { ManageDishComponent } from './components/admin/manage-dish/manage-dish.component';
import { ManageFanComponent } from './components/admin/manage-fan/manage-fan.component';
import { ManageRefriComponent } from './components/admin/manage-refri/manage-refri.component';
import { ManageTvComponent } from './components/admin/manage-tv/manage-tv.component';
import { ManageWashComponent } from './components/admin/manage-wash/manage-wash.component';



const routes: Routes = [
  
  {
    path: '',
    redirectTo: '/manage-air',
    pathMatch: 'full'
  },
  {
    path: "manage-air",
    component: ManageAirComponent,
  },
  {
    path: "manage-fan",
    component: ManageFanComponent,
  },
  {
    path: "manage-tv",
    component: ManageTvComponent,
  },
  {
    path: "manage-wash",
    component: ManageWashComponent,
  },
  {
    path: "manage-dish",
    component: ManageDishComponent,
  },
  {
    path: "manage-refri",
    component: ManageRefriComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
