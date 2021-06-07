import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

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

import { HttpConfigInterceptor } from './components/pages/auth/httpconfig.interceptor';
import { CommonDataService } from './common-data.service';
import { ModalService } from './_services/modal.service';


import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { CounterState } from './_services/ngxs-store/store/counter.store';
import { SuccessComponent } from './components/pages/success/success.component';

import { ExportAsModule } from 'ngx-export-as';
import { SingleitemComponent } from './components/pages/singleitem/singleitem.component';
import { ShowgroupComponent } from './components/pages/showgroup/showgroup.component';
import { ProductBygroupComponent } from './components/pages/product-bygroup/product-bygroup.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    SuccessComponent,
    SingleitemComponent,
    ShowgroupComponent,
    ProductBygroupComponent,
   

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
    ToastrModule.forRoot(),
    MatCardModule,
    MatIconModule,
    ExportAsModule
   
   
  ],
  exports: [FooterComponent],
  providers: [
    ModalService, 
    CommonDataService, 
 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
