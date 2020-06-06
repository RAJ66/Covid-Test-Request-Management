import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { DataService } from '../../services/data.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-requests-page',
  templateUrl: './employee-requests-page.component.html',
  styleUrls: ['./employee-requests-page.component.css'],
})
export class EmployeeRequestsPageComponent implements OnInit {
  allRequests: any;

  dataSource: any;
  requestId: string;
  displayedColumns: string[] = [
    'id',
    'requestState',
    'userState',
    'riskGroup',
    'riskProfession',
    'saude24',
    'userId',
    'firstTestDate',
    'firstTestResult',
    'secondTestDate',
    'secondTestResult',
    'employeeId',
  ];
  information: string;

  roleEmployee = 'Employee';
  roleUser = 'User';

  user = JSON.parse(localStorage.getItem('user'));

  constructor(public requests: RequestsService, public data: DataService) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    if (this.user.role === this.roleEmployee) {
      this.requests
        .getRequests(`employeeNif=${this.user.nif}`)
        .subscribe((res: any) => {
          this.allRequests = res.requestList;

          //Dates in our time zone
          for (let i = 0; i < this.allRequests.length; i++) {
            if (this.allRequests[i].riskGroup === true) {
              this.allRequests[i].riskGroup = 'Yes';
            } else {
              this.allRequests[i].riskGroup = 'No';
            }

            if (this.allRequests[i].riskProfession === true) {
              this.allRequests[i].riskProfession = 'Yes';
            } else {
              this.allRequests[i].riskProfession = 'No';
            }

            if (this.allRequests[i].saude24 === true) {
              this.allRequests[i].saude24 = 'Yes';
            } else {
              this.allRequests[i].saude24 = 'No';
            }

            //First Dates
            if (this.allRequests[i].firstTestDate === undefined) {
              this.allRequests[i].firstTestDate = 'Pending';
            } else {
              this.allRequests[i].firstTestDate =
                new Date(this.allRequests[i].firstTestDate).getFullYear() +
                '/' +
                (new Date(this.allRequests[i].firstTestDate).getMonth() + 1) +
                '/' +
                new Date(this.allRequests[i].firstTestDate).getDate();
            }
            //Second Dates
            if (this.allRequests[i].secondTestDate === undefined) {
              this.allRequests[i].secondTestDate = 'Pending';
            } else {
              this.allRequests[i].secondTestDate =
                new Date(this.allRequests[i].secondTestDate).getFullYear() +
                '/' +
                (new Date(this.allRequests[i].secondTestDate).getMonth() + 1) +
                '/' +
                new Date(this.allRequests[i].secondTestDate).getDate();
            }
          }

          this.dataSource = new MatTableDataSource(this.allRequests);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
    } else {
      this.requests
        .getRequests(`userNif=${this.user.nif}`)
        .subscribe((res: any) => {
          this.allRequests = res.requestList;

          //Dates in our time zone
          for (let i = 0; i < this.allRequests.length; i++) {
            if (this.allRequests[i].riskGroup === true) {
              this.allRequests[i].riskGroup = 'Yes';
            } else {
              this.allRequests[i].riskGroup = 'No';
            }

            if (this.allRequests[i].riskProfession === true) {
              this.allRequests[i].riskProfession = 'Yes';
            } else {
              this.allRequests[i].riskProfession = 'No';
            }

            if (this.allRequests[i].saude24 === true) {
              this.allRequests[i].saude24 = 'Yes';
            } else {
              this.allRequests[i].saude24 = 'No';
            }

            //First Dates
            if (this.allRequests[i].firstTestDate === undefined) {
              this.allRequests[i].firstTestDate = 'Pending';
            } else {
              this.allRequests[i].firstTestDate =
                new Date(this.allRequests[i].firstTestDate).getFullYear() +
                '/' +
                (new Date(this.allRequests[i].firstTestDate).getMonth() + 1) +
                '/' +
                new Date(this.allRequests[i].firstTestDate).getDate();
            }
            //Second Dates
            if (this.allRequests[i].secondTestDate === undefined) {
              this.allRequests[i].secondTestDate = 'Pending';
            } else {
              this.allRequests[i].secondTestDate =
                new Date(this.allRequests[i].secondTestDate).getFullYear() +
                '/' +
                (new Date(this.allRequests[i].secondTestDate).getMonth() + 1) +
                '/' +
                new Date(this.allRequests[i].secondTestDate).getDate();
            }
          }

          this.dataSource = new MatTableDataSource(res.requestList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
    }

    this.data.currentInformation.subscribe(
      (information) => (this.information = information)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showRequest(requestId) {
    this.data.changeinformation(requestId);
  }
}
