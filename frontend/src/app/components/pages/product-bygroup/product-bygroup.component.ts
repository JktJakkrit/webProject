import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/_services/master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-bygroup',
  templateUrl: './product-bygroup.component.html',
  styleUrls: ['./product-bygroup.component.css'],
})
export class ProductBygroupComponent implements OnInit, OnDestroy {
  loadProductByG;
  id: number;
  private sub: any;

  constructor(
    private masterService: MasterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      console.log(this.id);
      this.loadProductByGroup();
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadProductByGroup() {
    this.masterService.loadProductByGroupId(this.id).subscribe(
      (res: any) => {
        console.log('Group list => ' + res);
        console.log(res);

        this.loadProductByG = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
}
