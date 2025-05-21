import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, Observer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '@/services/auth.service';
import { Router } from '@angular/router';
import { RoleType } from '@/models/enums/RoleType.enum';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less',
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading = false; // wait for backend response

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  private fb = inject(NonNullableFormBuilder);
  private destroy$ = new Subject<void>();

  validateForm = this.fb.group({
    username: this.fb.control(
      '',
      [
        MyValidators.required,
        MyValidators.maxLength(12),
        // MyValidators.minLength(6),
      ],
      // [this.usernameAsyncValidator],
    ),
    firstname: this.fb.control('', [MyValidators.required]),
    lastname: this.fb.control('', [MyValidators.required]),
    password: this.fb.control('', [MyValidators.required]),
    confirm: this.fb.control(''),
  });

  // current locale is key of the nzAutoTips
  // if it is not found, it will be searched again with `default`
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
    },
    en: {
      required: 'Input is required',
    },
    // default: {
    //   email: '邮箱格式不正确/The input is not valid email',
    // },
  };

  ngOnInit(): void {
    this.validateForm.controls.password.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.validateForm.controls.confirm.updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    this.isLoading = true;
    if (this.validateForm.valid) {
      this.authService
        .register(
          this.validateForm.getRawValue().username,
          this.validateForm.getRawValue().firstname,
          this.validateForm.getRawValue().lastname,
          this.validateForm.getRawValue().password,
          [RoleType.ROLE_USER], // ROLE_ADMIN only in backend edited.
        )
        .subscribe({
          next: (res) => {
            console.log('submit', res);
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Register error: ', err);
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

  goBackToLogin() {
    this.router.navigate(['/login']);
  }

  // usernameAsyncValidator(
  //   control: AbstractControl,
  // ): Observable<ValidationErrors | null> {
  //   return new Observable((observer: Observer<MyValidationErrors | null>) => {
  //     setTimeout(() => {
  //       if (control.value === 'JasonWood') {
  //         observer.next({
  //           duplicated: {
  //             'zh-cn': `用户名已存在`,
  //             en: `The username is redundant!`,
  //           },
  //         });
  //       } else {
  //         observer.next(null);
  //       }
  //       observer.complete();
  //     }, 1000);
  //   });
  // }

  confirmValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }
}

// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<
  string,
  NzSafeAny
>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': `最小长度为 ${minLength}`,
          en: `MinLength is ${minLength}`,
        },
      };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          'zh-cn': `最大长度为 ${maxLength}`,
          en: `MaxLength is ${maxLength}`,
        },
      };
    };
  }

  // static mobile(control: AbstractControl): MyValidationErrors | null {
  //   const value = control.value;

  //   if (isEmptyInputValue(value)) {
  //     return null;
  //   }

  //   return isMobile(value)
  //     ? null
  //     : {
  //         mobile: {
  //           'zh-cn': `手机号码格式不正确`,
  //           en: `Mobile phone number is not valid`,
  //         },
  //       };
  // }
}

// function isEmptyInputValue(value: NzSafeAny): boolean {
//   return value == null || value.length === 0;
// }

// function isMobile(value: string): boolean {
//   return typeof value === 'string' && /(^1\d{10}$)/.test(value);
// }
