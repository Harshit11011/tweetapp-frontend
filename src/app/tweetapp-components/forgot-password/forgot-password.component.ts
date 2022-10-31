import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, AsyncValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPassword } from 'src/app/tweetapp-models/forgot-password';
import { UserServiceService } from 'src/app/tweetapp-services/user-service.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword: ForgotPassword;
  userName: string = '';

  constructor(private service: UserServiceService, private formBuilder: FormBuilder, private toastr: ToastrService, private route: Router,) {
    this.forgotPassword = {
      email: '',
      password: '',
    }
  }

  forgotPasswordForm = this.formBuilder.group({
    userName: ['', Validators.required],
    emailAddress: ['', Validators.required],
    password: ['', [Validators.required]],
  });



  ngOnInit(): void {
  }

  reset() {
    this.userName = this.forgotPasswordForm.get('userName')?.value;
    this.forgotPassword.email = this.forgotPasswordForm.get('emailAddress')?.value;
    this.forgotPassword.password = this.forgotPasswordForm.get('password')?.value;
    this.resetPassword(this.userName,this.forgotPassword);
  }

  public resetPassword(userName:string, forgotPassword: ForgotPassword) {
    let response = this.service.resetPassword(userName,forgotPassword);
    response.subscribe((data) => {
      this.route.navigateByUrl('/login');
      this.toastr.success('Password reset successful')
    }, (error) => {
      console.log(error.error);
      this.toastr.error("Please provide right credentials and try again ");
    });
  }

}
