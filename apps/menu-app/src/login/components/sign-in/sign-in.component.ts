import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Session } from 'login/providers/session.provider';
import { merge } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signUpButtonDisabled = true;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordTwice: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  emailFormControl = this.form.get('email') as any;
  passwordFormControl = this.form.get('password') as any;

  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  signUpAuthErrorMessage = signal('');

  constructor() {
    this.showEmailValidationErrorMessage();
    this.subscribePasswordValidation();
    this.subscribePasswordOnceValidation();
    this.subscribeSignUpButtonDisabled();
  }

  public updateEmailErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return this.emailErrorMessage.set('Por favor ingresa tu correo Office365');
    }
    if (this.emailFormControl.hasError('email')) {
      return this.emailErrorMessage.set('Ingresa un correo válido');
    }
    return this.emailErrorMessage.set('');
  }

  public updatePasswordErrorMessage() {
    if (this.passwordFormControl.hasError('required')) {
      return this.passwordErrorMessage.set('Por favor ingresa tu contraseña');
    }
    if (this.passwordFormControl.hasError('minlength')) {
      return this.passwordErrorMessage.set('Al menos 8 caracteres');
    }
    return this.passwordErrorMessage.set('');
  }

  private showEmailValidationErrorMessage() {
    merge(
      this.emailFormControl.statusChanges,
      this.emailFormControl.valueChanges,
    ).pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          this.updateEmailErrorMessage();
        },
        error: (error: any) => console.error(error),
      });
  }

  private subscribePasswordValidation() {
    merge(
      this.passwordFormControl.statusChanges,
      this.passwordFormControl.valueChanges,
    ).pipe(takeUntilDestroyed())
      .subscribe({
        next: () => this.updatePasswordErrorMessage(),
        error: (error: any) => console.error(error),
      });
  }

  private subscribePasswordOnceValidation() {
    merge(
      this.passwordFormControl.statusChanges,
      this.passwordFormControl.valueChanges,
    ).pipe(takeUntilDestroyed())
      .subscribe({
        next: () => this.updatePasswordErrorMessage(),
        error: (error: any) => console.error(error),
      });
  }

  private subscribeSignUpButtonDisabled() {
    merge(
      this.emailFormControl.statusChanges,
      this.passwordFormControl.statusChanges,
    ).pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          this.signUpButtonDisabled = !(
            this.emailFormControl.valid
            && this.passwordFormControl.valid
          );
        },
        error: (error: any) => console.error(error),
      });
  }

  private handleSignUpError(session: Session) {
    // this.openSnackBar(session.error?.message ?? '', 'Cerrar');
    // this.showOkButtonForRegistrationCanceling = true;

    new Promise((resolve, reject) => {
      setTimeout(() => {
        // this.resetLoginFlow();
        // this.showOkButtonForRegistrationCanceling = false;
        return resolve(null);
      }, 3000);
    });
  }
}
