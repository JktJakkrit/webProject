import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { ProductModelServer, serverResponse } from 'src/app/models/product.model';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  languages=['Angular 10','React','Node Js','Spring boot'];
  
   languageHasError=true;
  constructor() {
  }

  ngOnInit() {
    
  }

  
}
