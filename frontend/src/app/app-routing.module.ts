import { CartComponent } from './components/pages/cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------------------------------------------------------

import { CheckoutComponent } from './components/pages/checkout/checkout.component';

import { LoginComponent } from './components/pages/auth/login/login.component';
import { SuccessComponent } from './components/pages/success/success.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { HeaderComponent } from './components/pages/header/header.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { SingleitemComponent } from './components/pages/singleitem/singleitem.component';
import { ShowgroupComponent } from './components/pages/showgroup/showgroup.component';
import { ProductBygroupComponent } from './components/pages/product-bygroup/product-bygroup.component';
import { AllproductComponent } from './components/pages/allproduct/allproduct.component';




const routes: Routes = [
  
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'success',
    component: SuccessComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: "cart",
    component: CartComponent,
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
    path: 'product-details/:id', 
    component: SingleitemComponent 
  },

  { 
    path: 'group/:id', 
    component: ShowgroupComponent 
  },

  { 
    path: 'product-byGroup/:id', 
    component: ProductBygroupComponent 
  },
  
  { 
    path: 'products', 
    component: AllproductComponent 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
