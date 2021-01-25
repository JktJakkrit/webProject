import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/_services/master.service';
import { ModalService } from 'src/app/_services/modal.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-electric-fan',
  templateUrl: './electric-fan.component.html',
  styleUrls: ['./electric-fan.component.css']
})
export class ElectricFanComponent implements OnInit {

  masterFans;
  constructor( private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService) { }

  ngOnInit(): void {
    this.loadElectricFan();
  }
  loadElectricFan() {
    this.masterService. getMasterFans().subscribe(
      (res: any) => {
        this.masterFans = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
}