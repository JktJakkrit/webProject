import { OtherProduct } from './../../../models/other.model';
import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AirProduct } from 'src/app/models/air.model';
import { DishProduct } from 'src/app/models/dish.model';
import { FanProduct } from 'src/app/models/fan.model';
import { RefriProduct } from 'src/app/models/refri.model';
import { TvProduct } from 'src/app/models/tv.model';
import { WashProduct } from 'src/app/models/wash.model';
import { AirService } from 'src/app/_services/air.service';
import { DishService } from 'src/app/_services/dish.service';
import { FanService } from 'src/app/_services/fan.service';
import { ModalService } from 'src/app/_services/modal.service';
import { RefriService } from 'src/app/_services/refri.service';
import { TvService } from 'src/app/_services/tv.service';
import { WashService } from 'src/app/_services/wash.service';
import { AmountsService } from 'src/app/_services/amounts.service';
import Swal from 'sweetalert2';
import { CartDataServiceService } from 'src/app/_services/cart-data-service.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  masterAir;
  masterDish;
  masterFan;
  masterRefri;
  masterTv;
  masterWash;
  
  amountAir;
  amountFan;
  amountDish;
  amountRefri;
  amountTv;
  amountWash;
  amountOther;

  constructor(
    private modalService: ModalService,
    private airService: AirService,
    private dishService: DishService,
    private fanService: FanService,
    private refriService: RefriService,
    private washService: WashService,
    private tvService: TvService,
    private cartDataService: CartDataServiceService,
    private amountsService: AmountsService
    ) { 
    
    }
    
   
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  isDtInitialized: boolean = false;
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      // scrollY: "300px",
      // scrollX: true,
      // scrollCollapse: true,
      // paging: false,
  
      colResize: true,
      stateSave: true,
      autoWidth: false,
      responsive: true,
      // fixedColumns: true,
      dom: 'Bfrtip',
      // buttons: [
      //   {
      //     extend: 'excelHtml5',
      //     exportOptions: {
      //       columns: [0, 1, 2, 3, 4, 5, 6],
      //   },
      //     footer: true,
      //     title: function () {
      //       var filename = "sheet";
      //       return filename;
      //     },
      //     text: 'Export to Excel'
      //   },
      //   {
      //     extend: 'csvHtml5',
      //     fieldBoundary: '',
      //     fieldSeparator: ';',
      //     charset: 'UTF-8',
      //     bom: true,
      //     exportOptions: {
      //       columns: [0, 1, 2, 3, 4, 5, 6],
      //   },
      //     footer: true,
      //     title: function () {
      //       var filename = "sheet";
      //       return filename;
      //     },
      //     text: 'Export to CSV'
      //   },
      //   {
      //     extend:  'colvis',
      //     text: 'Select Column to Visibility'
      //   },
       
      // ]
    
    };

this.loadAirCondition();
this.loadDishwasher();
this.loadRefrigerator();
this.loadTelevision();
this.loadWashingMachine();
this.loadElectricFan();

this.loadAmountAir();
this.loadAmountDish();
this.loadAmountFan();
this.loadAmountRefri();
this.loadAmountTv();
this.loadAmountWash();
this.loadAmountOther();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  loadAirCondition() {
    this.airService.getMasterAirs().subscribe(
      (res: any) => {
        this.masterAir = res;
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
        // Swal.fire('Successful!', 'Load Building successful.', 'success');
      },

      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }

  loadDishwasher() {
    this.dishService.getMasterDishs().subscribe(
      (res: any) => {
        this.masterDish = res;
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
        // Swal.fire('Successful!', 'Load Building successful.', 'success');
      },

      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  loadElectricFan() {
    this.fanService.getMasterFans().subscribe(
      (res: any) => {
        this.masterFan = res;
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
        // Swal.fire('Successful!', 'Load Building successful.', 'success');
      },

      (error) => {
        Swal.fire("Error!", "error : " + error.status, "error");
      }
    );
  }

  loadRefrigerator() {
    this.refriService.getMasterRefri().subscribe(
      (res: any) => {
        this.masterRefri = res;
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
        // Swal.fire('Successful!', 'Load Building successful.', 'success');
      },

      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }

  loadTelevision() {
    this.tvService.getMasterTvs().subscribe(
      (res: any) => {
        this.masterTv = res;
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
        // Swal.fire('Successful!', 'Load Building successful.', 'success');
      },

      (error) => {
        Swal.fire("Error!", "error : " + error.status, "error");
      }
    );
  }

  loadWashingMachine() {
    this.washService.getMasterWashings().subscribe(
      (res: any) => {
        this.masterWash = res;
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
        // Swal.fire('Successful!', 'Load Building successful.', 'success');
      },

      (error) => {
        Swal.fire("Error!", "error : " + error.status, "error");
      }
    );
  }


  loadAmountAir() {
    this.amountsService.getAmountAir().subscribe(
      (res: any) => {
        this.amountAir = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  loadAmountFan() {
    this.amountsService.getAmountFan().subscribe(
      (res: any) => {
        this.amountFan = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  loadAmountDish() {
    this.amountsService.getAmountDish().subscribe(
      (res: any) => {
        this.amountDish = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  loadAmountTv() {
    this.amountsService.getAmountTv().subscribe(
      (res: any) => {
        this.amountTv = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  loadAmountRefri() {
    this.amountsService.getAmountRefri().subscribe(
      (res: any) => {
        this.amountRefri = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  loadAmountWash() {
    this.amountsService.getAmountWash().subscribe(
      (res: any) => {
        this.amountWash = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
  loadAmountOther() {
    this.amountsService.getAmountOther().subscribe(
      (res: any) => {
        this.amountOther = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }

}
