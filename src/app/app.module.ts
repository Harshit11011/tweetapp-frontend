import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'ngx-avatar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './tweetapp-components/header/header.component';
import { SignUpComponent } from './tweetapp-components/sign-up/sign-up.component';
import { LoginComponent } from './tweetapp-components/login/login.component';
import { ForgotPasswordComponent } from './tweetapp-components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { authInterceptorProviders } from './tweetapp-interceptors/token-interceptor';
import { HomeComponent } from './tweetapp-components/home/home.component';
import { SidebarComponent } from './tweetapp-components/sidebar/sidebar.component';
import { FooterComponent } from './tweetapp-components/footer/footer.component';
import { BodyComponent } from './tweetapp-components/body/body.component';
import { DaysAgoPipe } from './tweetapp-utilities/days-ago-pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignUpComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    BodyComponent,
    DaysAgoPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AvatarModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
