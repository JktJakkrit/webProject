import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/_services/master.service';
import { ModalService } from 'src/app/_services/modal.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-refrigerator',
  templateUrl: './refrigerator.component.html',
  styleUrls: ['./refrigerator.component.css']
})
export class RefrigeratorComponent implements OnInit {

  masterRefrigerator;
  constructor( private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService) { }

  ngOnInit(): void {
  }
  loadRefrigerator() {
    this.masterService. getMasterRefri().subscribe(
      (res: any) => {
        this.masterRefrigerator = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
}