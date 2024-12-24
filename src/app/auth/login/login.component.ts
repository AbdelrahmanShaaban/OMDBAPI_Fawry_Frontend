import { Component } from '@angular/core';
import { AuthService } from '../auth.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  loginError: string | null = null;
  token:any
  role:any

  constructor(private authService: AuthService, private router: Router) {

  }

  login() {
    this.loginError = null;
    console.log("credentials",this.credentials)
    this.authService.login(this.credentials).subscribe(
      (response) => {
        this.token = response.token;
        this.role = response.roles;
        console.log("role",this.role)
        localStorage.setItem('token',this.token);
        localStorage.setItem('role',this.role);
        this.router.navigate(['/search']); 
      },
      (error) => {
        this.loginError = error.error?.message || 'Invalid credentials';
      }
    );
  }
}