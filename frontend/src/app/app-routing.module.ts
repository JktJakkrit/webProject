import { WashingMachineComponent } from './components/products/washing-machine/washing-machine.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// -----------------Managements-----------------------------------
import { ManageAirComponent } from './components/admin/manage-air/manage-air.component';
import { ManageDishComponent } from './components/admin/manage-dish/manage-dish.component';
import { ManageFanComponent } from './components/admin/manage-fan/manage-fan.component';
import { ManageRefriComponent } from './components/admin/manage-refri/manage-refri.component';
import { ManageTvComponent } from './components/admin/manage-tv/manage-tv.component';
import { ManageWashComponent } from './components/admin/manage-wash/manage-wash.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { HeaderComponent } from './components/pages/header/header.component';


import { HomeComponent } from './components/pages/home/home.component';
import { AirConditioningComponent } from './components/products/air-conditioning/air-conditioning.component';
import { DishwasherComponent } from './components/products/dishwasher/dishwasher.component';
import { ElectricFanComponent } from './components/products/electric-fan/electric-fan.component';
import { RefrigeratorComponent } from './components/products/refrigerator/refrigerator.component';
import { TelevisionComponent } from './components/products/television/television.component';



const routes: Routes = [
  
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "header",
    component: HeaderComponent,
  },
  {
    path: "footer",
    component: FooterComponent,
  },
  {
    path: "air",
    component: AirConditioningComponent,
  },
  {
    path: "dish",
    component: DishwasherComponent,
  },
  {
    path: "fan",
    component: ElectricFanComponent,
  },
  {
    path: "refri",
    component: RefrigeratorComponent,
  },
  {
    path: "tv",
    component: TelevisionComponent,
  },
  {
    path: "wash",
    component: WashingMachineComponent,
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
