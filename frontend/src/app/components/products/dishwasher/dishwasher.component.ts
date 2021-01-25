import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/_services/master.service';
import { ModalService } from 'src/app/_services/modal.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dishwasher',
  templateUrl: './dishwasher.component.html',
  styleUrls: ['./dishwasher.component.css']
})
export class DishwasherComponent implements OnInit {

  masterDishwasher;
  constructor( private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService) { }

  ngOnInit(): void {
    this.loadDishwasher();
  }
  loadDishwasher() {
    this.masterService. getMasterDishs().subscribe(
      (res: any) => {
        this.masterDishwasher = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
}