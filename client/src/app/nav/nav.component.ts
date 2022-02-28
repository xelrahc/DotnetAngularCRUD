import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_model/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loggedIn: boolean = true;
  constructor(private router: Router, public userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
    this.toastr.success("Successfully logged out.");
  }

  editProfile(id: number) {debugger
    
    this.router.navigateByUrl(`/users/${id}`);
    // if(id == )
  }
}
