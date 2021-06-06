import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/_services/master.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-showgroup',
  templateUrl: './showgroup.component.html',
  styleUrls: ['./showgroup.component.css'],
})
export class ShowgroupComponent implements OnInit, OnDestroy {
  category;
  group;
  loadGroup;
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
      this.loadGroupByCategory();
      // In a real app: dispatch action to load the details here.
    });

    this.loadCategoryList();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadCategoryList() {
    this.masterService.loadCategory().subscribe(
      (res: any) => {
        console.log(res);

        this.category = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }

  loadGroupList() {
    this.masterService.loadGroup().subscribe(
      (res: any) => {
        console.log('Group list => ' + res);

        this.group = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }

  loadGroupByCategory() {
    this.masterService.loadGroupById(this.id).subscribe(
      (res: any) => {
        console.log('Group By Category =>' + res);

        this.loadGroup = res;
      },
      (error) => {
        Swal.fire('Error!', 'error : ' + error.status, 'error');
      }
    );
  }
}
