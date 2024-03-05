import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  role: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password, this.role)
      .subscribe(
        (response) => {
          console.log('Login successful:', response);
          // Store the token in local storage
          localStorage.setItem('token', response.token);
          // Redirect to dashboard or desired page
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Login failed:', error);
          // Display error message
          this.error = 'Invalid username or password';
        }
      );
  }
}