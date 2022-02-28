import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_model/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  loading: false;
  submitted = false;
  user: any;
  updatedUser: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: [{value:'', disabled: true}],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
    });

    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.getUserDetail(parseInt(userId));
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const user = JSON.parse(localStorage.getItem('user'));
    this.userService.updateUser(this.user.id, this.userForm.value).subscribe(updatedUser => {
      this.updatedUser = updatedUser;
      if(user.id == this.user.id)
      {
        this.userService.setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(this.updatedUser));
        console.log(this.userService.currentUser$);
      }
      this.toastr.success("Successfully updated user detail.")
    }, error => {
      console.log(error)
      this.toastr.error(error.error);
    });
  }

  getUserDetail(userId) {
    this.userService.getUser(userId).subscribe(user => {
      this.user = user;

      this.userForm.patchValue({
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        password: this.user.password,
      });
    })
  }

}
