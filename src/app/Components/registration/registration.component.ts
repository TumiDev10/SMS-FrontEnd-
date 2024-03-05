import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  username: string = '';
  password: string = '';
  role: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    const user = {
      username: this.username,
      password: this.password,
      role: this.role 
    };

    this.authService.register(user)
      .subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // Redirect to login page or dashboard
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed:', error);
          // Display error message
          this.error = 'Registration failed';
        }
      );
  }

}