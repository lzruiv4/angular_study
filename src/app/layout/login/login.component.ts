import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '@/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/home']);

        console.log('sdfasdf: ', res.token);
      },
      error: (err) => {
        this.errorMessage = '登录失败，请检查用户名或密码';
        console.error('sss: ', err);
      },
    });
  }
}
