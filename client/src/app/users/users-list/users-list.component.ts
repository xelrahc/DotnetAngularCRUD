import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: any = [];
  isAdmin: boolean = false;

  constructor(public userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers();
    const id = JSON.parse(localStorage.getItem('user')).id;
    if (id == 20) this.isAdmin = true; /* Admin account has id 20 */
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(id: number) {
    this.router.navigateByUrl(`/users/${id}`);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getAllUsers();
      this.toastr.success("Successfull remove user.")
    }, error => {
      console.log(error)
      this.toastr.error(error.error);
    });
  }

  addUser(page: string) {
    this.router.navigateByUrl(`/users/add`);
  }

}
