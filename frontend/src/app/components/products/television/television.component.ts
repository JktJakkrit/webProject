import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/_services/master.service';
import { ModalService } from 'src/app/_services/modal.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-television',
  templateUrl: './television.component.html',
  styleUrls: ['./television.component.css']
})
export class TelevisionComponent implements OnInit {

  masterTelevision;
  constructor( private formBuilder: FormBuilder,
    private modalService: ModalService,
    private masterService: MasterService) { }

  ngOnInit(): void {
  }
  loadTelevision() {
    this.masterService. getMasterTvs().subscribe(
      (res: any) => {
        this.masterTelevision = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
}