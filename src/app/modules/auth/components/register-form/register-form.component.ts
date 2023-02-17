import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from '@models/request-status.model';
import { AuthServiceService } from '@services/auth-service.service';

import { CustomValidators } from '@utils/validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  public errorMessage: string | null;
  form = this.formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('password', 'confirmPassword'),
      ],
    }
  );
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authSrv: AuthServiceService,
    private router: Router
  ) {
    this.errorMessage = '';
  }

  public async register() {
    try {
      if (this.form.valid) {
        this.status = 'loading';
        const { name, email, password } = this.form.getRawValue();
        await this.authSrv.register(name, email, password);
        this.status = 'success';
        this.router.navigateByUrl('/login');
      } else {
        this.form.markAllAsTouched();
      }
    } catch (error: any) {
      this.status = 'failed';
      switch (error.error.code) {
        case 'SQLITE_CONSTRAINT_UNIQUE':
          this.errorMessage = 'Email ya registrado, ingresa uno diferente';
          break;

        default:
          break;
      }
    }
  }
}
