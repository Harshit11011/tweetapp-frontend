import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  loggedUserIndicator: any;

  constructor(private toastr: ToastrService, private route: Router) { 
    var user = localStorage.getItem('user');
    if (user != null) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {
   
  }

  logout() {
    localStorage.clear();
    this.route.navigateByUrl('/');
    this.toastr.success('You have successfull logged out');
    this.isLoggedIn = false;
    
  }

}
