import {Component, OnInit} from '@angular/core';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title:string="ANGULAR 10 "
  

  constructor(public cartService: CartService) {
  }

  ngOnInit() {
  
}}
