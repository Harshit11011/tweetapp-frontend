import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/tweetapp-services/user-service.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, AsyncValidatorFn } from '@angular/forms';
import { UserLoginRequest } from 'src/app/tweetapp-models/user-login-request';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  httpResponse: any;
  isError: boolean = false;

  loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', [Validators.required]]
  });

  userLoginRequest!: UserLoginRequest;
  
  constructor(private service: UserServiceService, private formBuilder: FormBuilder,
    private toastr: ToastrService, private route: Router, private activatedRoute: ActivatedRoute) {
    this.userLoginRequest = {
      userName: '',
      password: '',
    }
    
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Sign-Up successful');
      }
    })
  }

  login() {
    this.userLoginRequest.userName = this.loginForm.get('userName')?.value;
    this.userLoginRequest.password = this.loginForm.get('password')?.value;
    this.getAccessToken(this.userLoginRequest);
  }

  public getAccessToken(userLoginRequest: UserLoginRequest) {
    let response = this.service.generateToken(userLoginRequest);
    response.subscribe((data) => {
      let text = JSON.stringify(data);
      let jwtToken = text.substring(12, text.length - 4);
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('user', userLoginRequest.userName);
      this.route.navigateByUrl('/body');
      this.toastr.success('Login Successful')
    }, (error) => {
      this.isError = true;
      this.toastr.error('Please check your credentials and try again.')
      console.log(error.error);
       });
  }


}
