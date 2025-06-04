import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '@/services/auth.service';
import { Router } from '@angular/router';
import { NzIconModule, provideNzIconsPatch } from 'ng-zorro-antd/icon';
import { LockOutline, UserOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
  ],
  providers: [provideNzIconsPatch([UserOutline, LockOutline])],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
})
export class LoginComponent {
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    remember: this.fb.control(true),
  });

  submitForm(): void {
    this.isLoading = true;
    if (this.validateForm.valid) {
      // console.log(this.validateForm.getRawValue().password);
      this.authService
        .login(
          this.validateForm.getRawValue().username,
          this.validateForm.getRawValue().password,
        )
        .subscribe({
          next: (res) => {
            this.authService.setToken(res.token);
            this.router.navigate(['/home']);
            console.log('submit', this.validateForm.value);
          },
          error: (err) => {
            console.error('sss: ', err);
            this.isLoading = false;
          },
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
