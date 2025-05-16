import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  // registerData = {
  username: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  // };

  message = '';
  messageColor = 'green';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.authService
      .register(this.username, this.firstname, this.lastname, this.password)
      .subscribe({
        next: (res) => {
          this.message = '注册成功！请登录。';
          this.messageColor = 'green';

          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.message = '注册失败：' + err.error.message || err.message;
          this.messageColor = 'red';
        },
      });
  }
}
