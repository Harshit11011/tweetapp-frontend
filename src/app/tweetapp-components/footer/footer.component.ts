import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/tweetapp-services/user-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private userServiceService :UserServiceService) { }

  ngOnInit(): void {
  }

}
