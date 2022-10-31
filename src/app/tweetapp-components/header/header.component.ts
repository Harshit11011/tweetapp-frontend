import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/tweetapp-services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private toastr: ToastrService, private route: Router, private service:UserServiceService) { 
    this.isLoggedIn=this.service.isUserLoggedIn();
  }

  ngOnInit(): void {
  }

  logout() {
    this.isLoggedIn = this.service.loggingOut();
    this.route.navigateByUrl('/');
    this.toastr.success('You have successfull logged out');
    
    
  }

}
