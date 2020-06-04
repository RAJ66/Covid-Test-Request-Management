import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { DataService } from '../../services/data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-update-profile-page',
  templateUrl: './update-profile-page.component.html',
  styleUrls: ['./update-profile-page.component.css'],
})
export class UpdateProfilePageComponent implements OnInit {
  information: any;

  userLogged: any = JSON.parse(localStorage.getItem('user'));
  user: any;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    public users: UsersService,
    public router: Router,
    public data: DataService
  ) {}

  ngOnInit(): void {
    this.data.currentInformation.subscribe(
      (information) => (this.information = information)
    );

    this.users.getUsers(`nif=${this.information}`).subscribe((res) => {
      this.user = res.userList[0];
    });
  }

  updateProfile() {
    this.users.updateUser(this.user._id, this.user).subscribe(() => {
      this.router.navigate(['/user/profile']);
    });
  }

  goChangePassword() {
    if (this.userLogged.role === 'Admin') {
      if (this.user.nif === this.userLogged.nif) {
        this.router.navigate(['/admin/profile/update/password/']);
      } else {
        this.router.navigate(['/admin/users/profile/update/password/']);
      }
    } else if (this.userLogged.role === 'User') {
      this.router.navigate(['/user/profile/update/password/']);
    } else if (this.userLogged.role === 'Employee') {
      this.router.navigate(['/employee/profile/update/password/']);
    }
  }
}
