import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app.component';
import { UserListComponent } from '../Components/user-list/user-list.component';
import { LoginComponent } from '../Components/login/login.component';
import { RegistrationComponent } from '../Components/registration/registration.component';
import { StudentComponent } from '../Components/student/student.component';
import { ParentGuardianComponent } from '../Components/parent-guardian/parent-guardian.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    LoginComponent,
    RegistrationComponent,
    StudentComponent,
    ParentGuardianComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }