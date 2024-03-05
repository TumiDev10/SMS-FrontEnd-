import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from '../Components/user-list/user-list.component';
import { LoginComponent } from '../Components/login/login.component';
import { RegistrationComponent } from '../Components/registration/registration.component';
import { StudentComponent } from '../Components/student/student.component';
import { ParentGuardianComponent } from '../Components/parent-guardian/parent-guardian.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'users', component: UserListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'students', component: StudentComponent },
  { path: 'parent-guardians', component: ParentGuardianComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }