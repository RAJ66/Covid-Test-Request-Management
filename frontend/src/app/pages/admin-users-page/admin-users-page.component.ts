import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.css'],
})
export class AdminUsersPageComponent implements OnInit {
  allUsers: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'nif',
    'name',
    'email',
    'birthDate',
    'contact',
    'role',
  ];
  information: string;

  constructor(public users: UsersService, public data: DataService) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.users.getUsers(null).subscribe((res: any) => {
      let found: boolean = false;
      let index: number;
      this.allUsers = res.userList;

      for (let i = 0; i < this.allUsers.length && !found; i++) {
        if (
          this.allUsers[i].nif === JSON.parse(localStorage.getItem('user')).nif
        ) {
          index = i;
          found = true;
        }
      }
      //To remove the Admin Logged
      this.allUsers.splice(index, 1);

      //Dates in our time zone
      for (let i = 0; i < this.allUsers.length; i++) {
        this.allUsers[i].birthDate =
          new Date(this.allUsers[i].birthDate).getFullYear() +
          '/' +
          (new Date(this.allUsers[i].birthDate).getMonth() + 1) +
          '/' +
          new Date(this.allUsers[i].birthDate).getDate();
      }

      this.dataSource = new MatTableDataSource(this.allUsers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

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

  showUser(userNif) {
    this.data.changeinformation(userNif);
  }
}
