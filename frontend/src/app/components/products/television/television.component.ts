import { CartDataServiceService } from './../../../_services/cart-data-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/_services/master.service';
import { ModalService } from 'src/app/_services/modal.service';
import Swal from 'sweetalert2';
import { TvProduct } from 'src/app/models/tv.model';
@Component({
  selector: 'app-television',
  templateUrl: './television.component.html',
  styleUrls: ['./television.component.css']
})
export class TelevisionComponent implements OnInit {

  masterTelevision: TvProduct[];
  constructor( private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService,
    private cartDataService: CartDataServiceService) { }

  ngOnInit(): void {
    this.loadTelevision();
  }
  loadTelevision() {
    this.masterService. getMasterTvs().subscribe(
      (res: TvProduct[]) => {
        this.masterTelevision = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  addToCart(data) {
    console.log("34567890-=");
    this.cartDataService.changeTvProduct(data);
  }
}