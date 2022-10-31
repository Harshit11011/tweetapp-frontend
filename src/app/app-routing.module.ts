import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './tweetapp-components/body/body.component';
import { ForgotPasswordComponent } from './tweetapp-components/forgot-password/forgot-password.component';
import { HeaderComponent } from './tweetapp-components/header/header.component';
import { HomeComponent } from './tweetapp-components/home/home.component';
import { LoginComponent } from './tweetapp-components/login/login.component';
import { SidebarComponent } from './tweetapp-components/sidebar/sidebar.component';
import { SignUpComponent } from './tweetapp-components/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'body', component: BodyComponent },
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
