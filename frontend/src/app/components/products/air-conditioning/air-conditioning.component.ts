import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/_services/master.service';
import { ModalService } from 'src/app/_services/modal.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-air-conditioning',
  templateUrl: './air-conditioning.component.html',
  styleUrls: ['./air-conditioning.component.css']
})
export class AirConditioningComponent implements OnInit {
  masterAir;
  constructor( private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService) { }

  ngOnInit(): void {
  }
  loadAirCondition() {
    this.masterService. getMasterAirs().subscribe(
      (res: any) => {
        this.masterAir = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
}
