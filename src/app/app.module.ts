import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

import { AirConditioningComponent } from './components/products/air-conditioning/air-conditioning.component';
import { DishwasherComponent } from './components/products/dishwasher/dishwasher.component';
import { ElectricFanComponent } from './components/products/electric-fan/electric-fan.component';
import { RefrigeratorComponent } from './components/products/refrigerator/refrigerator.component';
import { TelevisionComponent } from './components/products/television/television.component';
import { WashingMachineComponent } from './components/products/washing-machine/washing-machine.component';
import { ManageAirComponent } from './components/admin/manage-air/manage-air.component';
import { ManageDishComponent } from './components/admin/manage-dish/manage-dish.component';
import { ManageFanComponent } from './components/admin/manage-fan/manage-fan.component';
import { ManageRefriComponent } from './components/admin/manage-refri/manage-refri.component';
import { ManageTvComponent } from './components/admin/manage-tv/manage-tv.component';
import { ManageWashComponent } from './components/admin/manage-wash/manage-wash.component';
import { HeaderComponent } from './components/pages/header/header.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';


import {DataTablesModule} from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    AirConditioningComponent,
    DishwasherComponent,
    ElectricFanComponent,
    RefrigeratorComponent,
    TelevisionComponent,
    WashingMachineComponent,
    ManageAirComponent,
    ManageDishComponent,
    ManageFanComponent,
    ManageRefriComponent,
    ManageTvComponent,
    ManageWashComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
