import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from '@models/request-status.model';
import { AuthServiceService } from '@services/auth-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private authSrv: AuthServiceService,
    private router: Router
  ) {}

  public async doLogin() {
    try {
      if (this.form.valid) {
        this.status = 'loading';
        const { email, password } = this.form.getRawValue();
        await this.authSrv.login(email, password);
        this.status = 'success';
        this.router.navigateByUrl('/app');

        // TODO
      } else {
        this.form.markAllAsTouched();
      }
    } catch (error) {
      this.status = 'failed';
      console.log(error);
    }
  }
}
