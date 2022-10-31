import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, AsyncValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRegistrationRequest } from 'src/app/tweetapp-models/user-registration-request';
import { UserServiceService } from 'src/app/tweetapp-services/user-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registrationRequest: UserRegistrationRequest;

  signUpForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    emailAddress: ['', [Validators.required, Validators.email]],
    contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    userName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['']
  }, { validator: this.confirmPasswordValidator });

  constructor(private formBuilder: FormBuilder, private service: UserServiceService,
    private router: Router, private toastr: ToastrService) {
    this.registrationRequest = {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      userName: '',
      password: '',
    }
  }


  ngOnInit(): void {

  }

  signUp() {
    this.registrationRequest.firstName = this.signUpForm.get('firstName')?.value;
    this.registrationRequest.lastName = this.signUpForm.get('lastName')?.value;
    this.registrationRequest.email = this.signUpForm.get('emailAddress')?.value;
    this.registrationRequest.contactNumber = this.signUpForm.get('contactNumber')?.value;
    this.registrationRequest.userName = this.signUpForm.get('userName')?.value;
    this.registrationRequest.password = this.signUpForm.get('password')?.value;
    this.registerUser(this.registrationRequest);
  }

  public registerUser(registrationRequest: UserRegistrationRequest) {
    let response = this.service.register(registrationRequest);
    response.subscribe(()=>{
      this.router.navigate(['/login'],{queryParams:{registered:true}});
    },()=>{
      this.toastr.error("Registration failed as UserName is not available.!! Please try again");
    });
    
  }

  confirmPasswordValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.pristine || confirmPassword?.pristine) {
      return null;
    }
    return (password && confirmPassword && password.value != confirmPassword.value) ?
      { 'mismatch': true } : null;
  }

}
