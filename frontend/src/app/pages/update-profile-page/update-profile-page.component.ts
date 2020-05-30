import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

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
  user: any;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(public users: UsersService, public router: Router) {}

  ngOnInit(): void {
    this.users
      .getUsers(`nif=${JSON.parse(localStorage.getItem('user')).nif}`)
      .subscribe((res) => {
        this.user = res.userList[0];
      });
  }

  updateProfile() {
    this.users.updateUser(this.user._id, this.user).subscribe(() => {
      this.router.navigate(['/user/profile']);
    });
  }
}
